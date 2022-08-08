const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const Character = sequelize.define(
  "character",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.TINYINT,
    },
    weigth: {
      type: DataTypes.TINYINT,
    },
    history: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Character;
