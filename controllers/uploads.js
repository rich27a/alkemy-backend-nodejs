const path = require("path");
const fs = require("fs");
const { response } = require("express");
const Character = require("../models/character");
const Movie = require("../models/movie");
const Genre = require("../models/genre");
const { uploadFile } = require("../helpers/upload-files");

const updateIMG = async (req, res = response) => {
  const { colection, id } = req.params;

  let model;

  switch (colection) {
    case "movies":
      model = await Movie.findByPk(id);

      if (!model) {
        return res.json({
          msg: `There is no character with id ${id}`,
        });
      }
      break;

    case "characters":
      model = await Character.findByPk(id);
      if (!model) {
        return res.json({
          msg: `There is no character with id ${id}`,
        });
      }
      break;

    case "genres":
      model = await Genre.findByPk(id);
      if (!model) {
        return res.json({
          msg: `There is no genre with id ${id}`,
        });
      }
      break;

    default:
      return res.status(404).json({
        msg: "resource not found",
      });
      break;
  }

  if (model.img) {
    const pathImg = path.join(__dirname, "../uploads", colection, model.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  if (!req.files) {
    return res.json({
      msg: "there is no file",
    });
  }

  const url = await uploadFile(req.files, undefined, colection);
  model.img = url;

  await model.save();

  res.json({
    model,
  });
};

const getImg = async (req, res = response) => {
  const { colection, id } = req.params;

  let model;

  switch (colection) {
    case "movies":
      model = await Movie.findByPk(id);

      if (!model) {
        return res.json({
          msg: `there is no character with id ${id}`,
        });
      }

      break;

    case "characters":
      model = await Character.findByPk(id);

      if (!model) {
        return res.json({
          msg: `there is no character with id ${id}`,
        });
      }

      break;

    case "genres":
      model = await Genre.findByPk(id);

      if (!model) {
        return res.json({
          msg: `There is no genre with id ${id}`,
        });
      }
      break;
    default:
      return res.status(400).json({
        msg: "resource not found",
      });
      break;
  }

  if (model.img) {
    const pathImagen = path.join(__dirname, "../uploads", colection, model.img);
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.join(__dirname, "../assets/", "no-image.jpg");
  return res.sendFile(pathImagen);
};

module.exports = {
  updateIMG,
  getImg,
};
