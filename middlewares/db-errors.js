const { response } = require("express");
const Character = require("../models/character");
const Genre = require("../models/genre");
const Movie = require("../models/movie");

const genreExistById = async (req, res = response, next) => {
  const { id } = req.params;

  try {
    const genreExist = await Genre.findByPk(id);

    if (!genreExist) {
      return res.status(400).json({
        msg: `Genre with id ${id} does not exist`,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Error while searching genre in DB",
    });
  }
};

const movieExistById = async (req, res = response, next) => {
  const { id } = req.params;

  try {
    const movieExist = await Movie.findByPk(id);

    if (!movieExist) {
      return res.status(400).json({
        msg: `Movie with id ${id} does not exist`,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Error while searching in db",
    });
  }
};

const characterExistById = async (req, res = response, next) => {
  const { id } = req.params;

  try {
    const characterExist = await Character.findByPk(id);

    if (!characterExist) {
      return res.json({
        msg: `Character with id ${id} does not exist`,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "error while searching in db",
    });
  }
};

module.exports = {
  genreExistById,
  movieExistById,
  characterExistById,
};
