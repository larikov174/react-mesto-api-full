const jwt = require('jsonwebtoken');

const { JWT_SECRET = '7211ca75fe3f17b9962ae00d11789f172b4734afb03c088954f529ba9ad16b36' } = process.env;
const CustomError = require('../utils/CustomError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new CustomError(401, 'Необходима авторизация');
  }

  req.user = payload;
  next();
};
