const router = require("express").Router();
const { AuthController } = require("./../controllers");

router
  .post("/login", AuthController.login)
  .post("/register", AuthController.register);

module.exports = router;
