const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_content"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    twitter: req.body.twitter,
    github: req.body.github,
  }).then((dbData) => {
    req.session.save(() => {
      req.session.user_id = dbData.id;
      req.session.username = dbData.username;
      req.session.twitter = dbData.twitter;
      req.session.github = dbData.github;
      req.session.loggedIn = true;

      res.json(dbData);
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbData) => {
    if (!dbData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbData.id;
      req.session.username = dbData.username;
      req.session.twitter = dbData.twitter;
      req.session.github = dbData.github;
      req.session.loggedIn = true;

      res.json({ user: dbData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
