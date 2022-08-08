const { Router } = require("express");
const { check } = require("express-validator");
const { searchMovies, searchCharacters } = require("../controllers/search");
const { verifyErrors } = require("../middlewares/validate-errors");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/movies", [validateJWT, verifyErrors], searchMovies);
router.get("/characters", [validateJWT, verifyErrors], searchCharacters);

module.exports = router;
