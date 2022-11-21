const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const { UNAUTHORIZATION_ERROR_CODE } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      Promise.reject();
    }
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
    req.user = payload;
    next();
  } catch (e) {
    return res
      .status(UNAUTHORIZATION_ERROR_CODE)
      .send({ message: "Необходима авторизация" });
  }
};
