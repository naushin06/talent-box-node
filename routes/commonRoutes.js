const {
  register,
  login,
  welcomeMessage,
  logout,
} = require("../controllers/authController");
const {
  getDashboardContent,
  createDashboardContent,
} = require("../controllers/dashboardController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/welcome", welcomeMessage);
router.post("/createDashboardContent", createDashboardContent);
router.get("/getDashboardContent", getDashboardContent);

module.exports = router;
