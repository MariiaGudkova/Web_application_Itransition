const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");
const {
  register,
  login,
  getUsers,
  deleteUser,
  blockUser,
} = require("../controllers/users");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  register
);
router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
router.get("/", auth, getUsers);
router.delete("/deleteUsers", auth, deleteUser);
router.patch("/blockUsers", auth, blockUser);

module.exports = router;
