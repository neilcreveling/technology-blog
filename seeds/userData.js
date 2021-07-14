const sequelize = require("../config/connection.js");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const userData = [
  {
    email: "emilysmith@gmail.com",
    username: "esmith",
    password: "abcdefg",
  },
  {
    email: "trevorjones@yahoo.com",
    username: "trevtrev",
    password: "12345678",
  },
  {
    email: "laurendrew@hotmail.com",
    username: "amazinglaurie",
    password: "a2d3c4"
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;