const { Router, request } = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/auth");
const { validateConfirmPassword } = require("../helpers/auth-validators");
const { verifyErrors } = require("../middlewares/validate-errors");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
//create session
router.post(
  "/register",
  [
    // check("email", "Email is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("name", "name is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
    check("password", "Minimum length of password is 6").isLength({ min: 6 }),
    check("password").custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("password confirmation is invalid");
      } else {
        return true;
      }
    }),
    verifyErrors,
  ],
  register
);

router.post("/login", login);

module.exports = router;
