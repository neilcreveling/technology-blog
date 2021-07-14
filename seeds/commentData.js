const sequelize = require("../config/connection");
const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 2,
    content: "Interesting ideas!",
  },
  {
    user_id: 2,
    post_id: 1,
    content: "I'm not sure if I understand, but I'd love to learn more.",
  },
  {
    user_id: 1,
    post_id: 1,
    content: "Glad you liked it!",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;