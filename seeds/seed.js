const sequelize = require("../config/connection");
const seedUsers = require("./userData.js");
const seedPosts = require("./postData.js");
const seedComments = require("./commentData");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedPosts();
  await seedComments();
  process.exit(0);
};

seedAll();