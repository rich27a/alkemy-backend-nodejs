const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

const Movie = sequelize.define(
  "movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img: {
      type: DataTypes.STRING,
    },
    tittle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Movie;
