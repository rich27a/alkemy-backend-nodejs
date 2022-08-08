const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const Genre = sequelize.define("genre", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    //allowNull default true
  },
});

module.exports = Genre;
