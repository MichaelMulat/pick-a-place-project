const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../passport");

router
  // Matches with "api/user/signup"
  .route("/signup")
  .post(userController.create);

router
  // Matches with "api/user/login"
  .route("/login")
  .post(passport.authenticate("local"), userController.login);

// Matches with "api/user/"
router
.route("/").get(userController.getUser);

// Match with api/user/logout
router
.route("/logout").post(userController.logout);

module.exports = router;
