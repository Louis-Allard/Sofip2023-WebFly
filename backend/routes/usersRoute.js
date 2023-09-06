const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const jwt = require("jsonwebtoken");

router.get("/all", userController.findAll);
router.get("/user/:id", userController.findOne);
router.post("/user/", userController.create);
router.delete("/user/:id", userController.delete);
router.get("/logout", userController.logout);
router.post("/login", userController.login);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authentificated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token error" });
      } else {
        req.id = decoded.id;
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

router.get("/", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    username: req.username,
    role: req.role,
    id: req.id,
  });
});

module.exports = router;
