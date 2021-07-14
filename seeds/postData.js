const sequelize = require("../config/connection");
const { Post } = require("../models");

const postData = [
  {
    user_id: 1,
    title: "Post1",
    content: "Lorem ipsum dolor.",
  },
  {
    user_id: 2,
    title: "Post2",
    content: "Lorem ipsum dolor.",
  },
  {
    user_id: 3,
    title: "Post3",
    content: "Lorem ipsum dolor.",
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;