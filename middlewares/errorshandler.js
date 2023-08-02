const { incorrectId, userEmailIsExist, serverError } = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: incorrectId });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: userEmailIsExist });
  }

  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverError
        : message,
    });
};
