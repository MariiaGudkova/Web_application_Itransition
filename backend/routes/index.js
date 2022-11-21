const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  register,
  login,
  getUsers,
  deleteUser,
  blockUser,
} = require("../controllers/users");

router.post("/signup", register);
router.post("/signin", login);
router.get("/", auth, getUsers);
router.delete("/deleteUsers", auth, deleteUser);
router.patch("/blockUsers", auth, blockUser);

module.exports = router;
