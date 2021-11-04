const { User } = require("../models");

const userData = [
  {
    username: "martin",
    twitter: "TravisSaucedo",
    github: "zoombabyy",
    email: "martin@gmail.com",
    password: "password1!",
  },
  {
    username: "matt",
    twitter: "TravisSaucedo",
    github: "zoombabyy",
    email: "mathew@gmail.com",
    password: "password2!",
  },
  {
    username: "shaun",
    twitter: "TravisSaucedo",
    github: "zoombabyy",
    email: "shaun@gmail.com",
    password: "password3!",
  },
  {
    username: "lee",
    twitter: "TravisSaucedo",
    github: "zoombabyy",
    email: "lee@gmail.com",
    password: "password4!",
  },
  {
    username: "maddd",
    twitter: "TravisSaucedo",
    github: "zoombabyy",
    email: "madd@gmail.com",
    password: "password5!",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
