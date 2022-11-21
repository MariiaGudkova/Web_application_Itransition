const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { NODE_ENV, JWT_SECRET } = process.env;
const {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZATION_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require("../utils/constants");

const register = (req, res) => {
  const { name, email, password, status } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
        status,
      })
    )
    .then((user) => {
      const { password: p, ...data } = JSON.parse(JSON.stringify(user));
      res.send({ data });
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST_ERROR_CODE).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      }
      if (e.code === 11000) {
        return res
          .status(CONFLICT_ERROR_CODE)
          .send({ message: "Пользователь с таким email уже существует" });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .orFail()
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject();
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
            { expiresIn: "24h" }
          );
          res.send({ token });
        })
        .catch((e) => {
          return res
            .status(UNAUTHORIZATION_ERROR_CODE)
            .send({ message: "Неправильная почта или пароль" });
        });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((e) => {
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: "На сервере произошла ошибка" });
    });
};

const deleteUser = (req, res) => {
  User.findById(req.body._id)
    .orFail()
    .then((user) => {
      return user
        .remove()
        .then(() => res.send({ message: "Пользователь удален" }));
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Передан некорректный _id пользователя" });
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        return res
          .status(NOTFOUND_ERROR_CODE)
          .send({ message: "Пользователь с указанным _id не найден" });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

const blockUser = (req, res) => {
  const { status } = req.body;
  User.findByIdAndUpdate(req.body._id, { status }, { new: true })
    .orFail()
    .then((user) => {
      if (user.status === "Block") {
        return res
          .status(UNAUTHORIZATION_ERROR_CODE)
          .send({ message: "Ваш аккаунт заблокирован. Требуется авторизация" });
      } else {
        next();
      }
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Передан некорректный _id пользователя" });
      }
      if (e instanceof mongoose.Error.DocumentNotFoundError) {
        return res
          .status(NOTFOUND_ERROR_CODE)
          .send({ message: "Пользователь с указанным _id не найден" });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  blockUser,
};
