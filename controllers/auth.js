const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { response } = require("express");
const { generateJWT } = require("../helpers/generateJWT");
const sendEmail = require("../helpers/email-sender");

const register = async (req, res = response) => {
  const { email, name, password, city } = req.body;

  const salt = bcryptjs.genSaltSync();
  const hashedPassword = bcryptjs.hashSync(password, salt);

  try {
    const userExist = await User.findOne({
      where: {
        email,
      },
    });
    if (userExist) {
      return res.json({
        msg: `User with email ${email} already exist in db`,
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      city,
    });

    sendEmail(email, name);

    res.json({
      msg: "User has been registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: `The user with email ${email} has already been registered`,
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.json({
        msg: "email/password not valid",
      });
    }

    //verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "email/password not valid",
      });
    }

    //generate jwt
    const token = await generateJWT(user.id);

    return res.json({
      msg: "Login has been successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error - please contact admin",
    });
  }

  //Obtener usuarios ordenados por fecha de creacion
  // const orderedUsers = await User.findAll({
  //   limit: 10,
  //   order: ["createdAt"],
  // });

  // res.json({
  //   orderedUsers,
  // });
};

module.exports = {
  register,
  login,
};
