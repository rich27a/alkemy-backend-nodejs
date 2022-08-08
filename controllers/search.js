const { response } = require("express");
const { Op } = require("sequelize");
const Character = require("../models/character");
const Movie = require("../models/movie");

const searchCharacters = async (req, res = response) => {
  const { name = "", age = 0, weigth = 0, movie = 0 } = req.query;
  try {
    //busqueda por nombre
    let characters = await Character.findAll({
      where: {
        name: {
          [Op.like]: "%" + name + "%",
        },
      },
      //order: [["name", "desc"]],

      attributes: ["img", "name", "age", "weigth"],
      include: {
        model: Movie,
        attributes: ["id", "tittle"],
        through: { attributes: [] },
      },
    });

    //filtrar por edad
    if (age) {
      characters = characters.filter((character) => character.age == age);
    }

    //filtrar por peso
    if (weigth) {
      characters = characters.filter((character) => character.weigth == weigth);
    }

    //filtrar por movieId
    if (movie) {
      characters = characters.filter((character) =>
        character.movies.some((movieId) => movieId.id == movie)
      );
    }

    return res.json({
      characters,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error while searching characters",
    });
  }
};

const searchMovies = async (req, res = response) => {
  const { name = "", idGenero, order = "asc" } = req.query;

  const orders = ["asc", "desc"];

  //   if (!orders.includes(order)) {
  //     order = "asc";
  //   }

  try {
    let movies = await Movie.findAll({
      where: {
        tittle: {
          [Op.like]: "%" + name + "%",
        },
      },
      attributes: ["tittle", "genreId"],
      order: [["tittle", order]],
    });

    //filtrar por idGenero
    if (idGenero) {
      movies = movies.filter((movie) => movie.genreId == idGenero);
    }

    return res.json({
      movies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error while searching movies",
    });
  }
};

module.exports = {
  searchCharacters,
  searchMovies,
};
