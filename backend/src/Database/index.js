const Sequelize = require("sequelize");
const ConfigDB = require("../Config/database");

const User = require("../Models/User");

const connection = new Sequelize(ConfigDB);

User.init(connection);

module.exports = connection;
