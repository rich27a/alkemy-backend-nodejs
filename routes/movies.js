const { Router } = require("express");
const { check, body } = require("express-validator");
const {
  getMovies,
  getMovie,
  createMovie,
  modifyMovie,
  deleteMovie,
} = require("../controllers/movies");
const { movieExistById } = require("../middlewares/db-errors");
const { verifyErrors } = require("../middlewares/validate-errors");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// get all movies - private - valid x-token
router.get("/", [validateJWT, verifyErrors], getMovies);

//get one movie - private - valid x-token
router.get("/:id", [validateJWT, movieExistById, verifyErrors], getMovie);

//create one movie - private - valid x-token
router.post(
  "/",
  [validateJWT, check("tittle", "tittle is required").notEmpty(), verifyErrors],
  createMovie
);

//modify one movie - private - valid x-token
router.put("/:id", [validateJWT, movieExistById, verifyErrors], modifyMovie);

//delete one movie - private - valid x-token
router.delete("/:id", [validateJWT, movieExistById, verifyErrors], deleteMovie);

module.exports = router;
