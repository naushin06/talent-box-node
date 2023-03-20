const {
  register,
  login,
  welcomeMessage,
  LogOut
} = require("../controllers/authController");
// const {
//   LogOut
// }=require("../MiddleWare/authMiddleware")
const {
  getDashboardContent,
  createDashboardContent,
} = require("../controllers/dashboardController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/welcome", welcomeMessage);
router.get('/logout',LogOut)
router.post("/createDashboardContent", createDashboardContent);
router.get("/getDashboardContent", getDashboardContent);
module.exports = router;
