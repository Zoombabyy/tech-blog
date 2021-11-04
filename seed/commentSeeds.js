const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 5,
    comment_text: "This is amazing!",
  },
  {
    user_id: 4,
    post_id: 4,
    comment_text: "Wow, wonderful work!",
  },
  {
    user_id: 1,
    post_id: 4,
    comment_text: "Awesome! Congrats to everyone who contributed",
  },
  {
    user_id: 3,
    post_id: 5,
    comment_text: "We just reached a 500 subscribers!",
  },
  {
    user_id: 3,
    post_id: 2,
    comment_text: "This is great!",
  },
  {
    user_id: 5,
    post_id: 3,
    comment_text: "Very useful tool!",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
