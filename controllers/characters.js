const { response, request } = require("express");
const { Op } = require("sequelize");
const Character = require("../models/character");
const Movie = require("../models/movie");

const getCharacters = async (req = request, res = response) => {
  try {
    const characters = await Character.findAll({
      attributes: ["img", "name"],
    });

    if (!characters) {
      return res.json({
        msg: "There is no characters",
      });
    }

    return res.json({
      characters,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

const getCharacter = async (req, res = response) => {
  const { id } = req.params;

  try {
    const character = await Character.findByPk(id, {
      include: {
        model: Movie,
        attributes: ["tittle"],
        through: {
          attributes: [],
        },
      },
      attributes: ["img", "name", "age", "weigth", "history"],
    });

    if (!character) {
      return res.json({
        msg: `There is no character with id ${id}`,
      });
    }

    //

    return res.json({
      character,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error while searching",
    });
  }
};

const createCharacter = async (req, res = response) => {
  const { name, age, weigth, history, movies = [] } = req.body;

  try {
    const character = await Character.create({
      name,
      age,
      weigth,
      history,
    });

    movies.forEach(async (id) => {
      let movie = await Movie.findByPk(id);
      await character.addMovie(movie);
    });

    return res.json({
      msg: "Character has been created",
      character,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error while creating character",
    });
  }
};

const modifyCharacter = async (req, res = response) => {
  const { id } = req.params;
  const { name, age, weigth, history, movies = [] } = req.body;

  try {
    const character = await Character.findByPk(id);

    if (!character) {
      return res.json({
        msg: `Character with id ${id} does not exist`,
      });
    }

    //update movies
    if (movies.length > 0) {
      await character.setMovies([]);

      movies.forEach(async (id) => {
        let movie = await Movie.findByPk(id);
        await character.addMovie(movie);
      });
    }

    const characterUpdated = await character.update({
      name,
      age,
      weigth,
      history,
    });

    return res.json({
      msg: `Character with id ${id} has been updated`,
      characterUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error while updating resource",
    });
  }
};

const deleteCharacter = async (req, res = response) => {
  const { id } = req.params;

  try {
    const characterDeleted = await Character.destroy({
      where: {
        id,
      },
    });

    return res.json({
      msg: "character has been deleted",
      characterDeleted,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: `Error while deleting`,
    });
  }
};

module.exports = {
  getCharacters,
  getCharacter,
  createCharacter,
  modifyCharacter,
  deleteCharacter,
};
