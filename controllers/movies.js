const { response } = require("express");
const Character = require("../models/character");
const Movie = require("../models/movie");

const getMovies = async (req, res = response) => {
  try {
    const movies = await Movie.findAll({
      // include: {
      //   model: Character,
      //   attributes: ["name"],
      //   through: { attributes: [] },
      // },
      attributes: ["img", "tittle", "createdAt"],
    });
    res.json({
      movies,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "error",
    });
  }
};

const getMovie = async (req, res = response) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id, {
      include: {
        model: Character,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      attributes: ["img", "tittle", "rating"],
    });

    if (!movie) {
      return res.json({
        msg: `there is no movie with id ${id}`,
      });
    }
    return res.json({
      movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error",
    });
  }
};

const createMovie = async (req, res = response) => {
  const { tittle, rating, characters = [], genreId } = req.body;

  if (rating < 0 || rating > 5) {
    return res.json({
      msg: `rating need to be between 0-5`,
    });
  }

  try {
    const movie = await Movie.create({
      tittle,
      rating,
      genreId,
    });

    characters.forEach(async (id) => {
      let character = await Character.findByPk(id);
      await movie.addCharacter(character);
    });

    return res.json({
      msg: "Creating movie...",
      movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "error while creating movie",
    });
  }
};

const modifyMovie = async (req, res = response) => {
  const { id } = req.params;
  const { tittle, rating, characters = [], genreId } = req.body;

  try {
    const movie = await Movie.findByPk(id);

    if (!movie) {
      return res.json({
        msg: `Movie with id ${id} does not exist`,
      });
    }

    //update characters
    if (characters.length > 0) {
      await movie.setCharacters([]);

      //check if it is a valid character
      characters.forEach(async (id) => {
        let character = await Character.findByPk(id);
        await movie.addCharacter(character);
      });
    }

    const movieUpdated = await movie.update({
      tittle,
      rating,
      genreId,
    });

    return res.json({
      msg: `Movie with id ${id} has been updated`,
      movieUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error while modifyng movie",
    });
  }
};

const deleteMovie = async (req, res = response) => {
  const { id } = req.params;

  try {
    const movieDeleted = await Movie.destroy({
      where: {
        id,
      },
    });

    if (movieDeleted < 1) {
      return res.status(400).json({
        msg: `Error while deleting movie with id ${id}`,
      });
    }
    return res.json({
      msg: "movie has been deleted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error while deleting ",
    });
  }
};

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  modifyMovie,
  deleteMovie,
};
