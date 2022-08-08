const { Router } = require("express");
const { updateIMG, getImg } = require("../controllers/uploads");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = new Router();

//upload-update img - private - valid x-token
router.put("/:colection/:id", [validateJWT], updateIMG);

//get image - private - valid x-token
router.get("/:colection/:id", [validateJWT], getImg);

module.exports = router;
