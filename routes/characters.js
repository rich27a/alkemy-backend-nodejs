const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCharacter,
  getCharacters,
  createCharacter,
  modifyCharacter,
  deleteCharacter,
} = require("../controllers/characters");
const { characterExistById } = require("../middlewares/db-errors");
const { verifyErrors } = require("../middlewares/validate-errors");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

//get all characters - private - valid x-token
router.get("/", [validateJWT, verifyErrors], getCharacters);

//get one character - private - valid x-token
router.get(
  "/:id",
  [validateJWT, characterExistById, verifyErrors],
  getCharacter
);

//create character - private - valid x-token
router.post(
  "/",
  [validateJWT, check("name").notEmpty(), verifyErrors],
  createCharacter
);

// modify character - private - valid x-token
router.put(
  "/:id",
  [validateJWT, characterExistById, verifyErrors],
  modifyCharacter
);

//delete character - private - valid x-token
router.delete(
  "/:id",
  [validateJWT, characterExistById, verifyErrors],
  deleteCharacter
);

module.exports = router;
