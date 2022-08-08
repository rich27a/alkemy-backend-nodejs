const jwt = require("jsonwebtoken");

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.JWTPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          return resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
