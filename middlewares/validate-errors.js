const { validationResult } = require("express-validator");

const verifyErrors = (req, res, next) => {
  const errors = validationResult(req);

  console.log("Checking errors");

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    });
  }

  next();
};

module.exports = {
  verifyErrors,
};
