const { response } = require("express");
const Genre = require("../models/genre");

const getGenres = async (req, res = response) => {
  try {
    const genre = await Genre.findAll();

    return res.json({
      genre,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "error",
    });
  }
};

const getGenre = async (req, res = response) => {
  const { id } = req.params;

  try {
    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.json({
        msg: `There is no genre with id ${id}`,
      });
    }

    return res.json({
      genre,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error while searching genre by id",
    });
  }

  res.json({
    msg: "Get one genre",
  });
};

const createGenre = async (req, res = response) => {
  const { name } = req.body;

  try {
    const genreExist = await Genre.findOne({
      where: {
        name,
      },
    });
    if (genreExist) {
      return res.json({
        msg: `Genre ${name} already exists in database`,
      });
    }
    const genre = await Genre.create({
      name,
    });

    return res.json({
      genre,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "error while creating genre",
    });
  }
};

const modifyGenre = async (req, res = response) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const genreUpdated = await Genre.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.json({
      genreUpdated,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Error while modifyng genre",
    });
  }
};

const deleteGenre = async (req, res = response) => {
  const { id } = req.params;

  try {
    const genreDeleted = await Genre.destroy({
      where: {
        id,
      },
    });

    return res.json({
      msg: "Genre has been deleted",
      genreDeleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "An error has been ocurring while deleting genre",
    });
  }
};

module.exports = {
  getGenre,
  getGenres,
  modifyGenre,
  createGenre,
  deleteGenre,
};
