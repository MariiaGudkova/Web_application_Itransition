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
      if (user.status === "Заблокирован") {
        return res
          .status(UNAUTHORIZATION_ERROR_CODE)
          .send({ message: "Пользователь был заблокирован. Доступ запрещен" });
      }
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

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
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
          .send({ message: "Пользователь по указанному _id не найден" });
      } else {
        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "На сервере произошла ошибка" });
      }
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
  const { ids } = req.body;
  User.deleteMany({ _id: { $in: ids } }, { new: true })
    .orFail()
    .then(() => res.send({ message: "Успешно" }))
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
  const { ids, status } = req.body;
  User.updateMany({ _id: { $in: ids } }, { status }, { new: true })
    .orFail()
    .then(() => {
      return res.send({ message: "Успешно" });
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
          .send({ message: "На сервере произошла ошибка", e });
      }
    });
};

module.exports = {
  register,
  login,
  getUserInfo,
  getUsers,
  deleteUser,
  blockUser,
};
