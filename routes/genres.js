const { Router } = require("express");
const { Check, check } = require("express-validator");
const {
  getGenre,
  getGenres,
  createGenre,
  modifyGenre,
  deleteGenre,
} = require("../controllers/genres");
const { genreExistById } = require("../middlewares/db-errors");
const { verifyErrors } = require("../middlewares/validate-errors");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", [validateJWT], getGenres);

router.get("/:id", [validateJWT, genreExistById, verifyErrors], getGenre);

router.post("/", [validateJWT], createGenre);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "id not valid").not().isNumeric(),
    genreExistById,
    verifyErrors,
  ],
  modifyGenre
);

router.delete("/:id", [validateJWT, genreExistById], deleteGenre);

module.exports = router;
