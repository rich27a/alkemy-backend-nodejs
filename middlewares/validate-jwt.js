const { response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "please log in!!",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWTPRIVATEKEY);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({
        msg: "token/user not valid",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "token/user not valid",
    });
  }
};

module.exports = {
  validateJWT,
};
