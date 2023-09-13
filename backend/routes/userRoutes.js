const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require('jsonwebtoken')

router.get('/all', userController.findAll);
router.get('/user/:id', userController.findById);
router.post('/user', userController.create);
router.put('/user/:id', userController.update);
router.put('/user/info/:id', userController.updateInfo);
router.put('/user/pass/:id', userController.updatePass);
router.delete('/user/:id', userController.delete);
router.get('/logout', userController.logout)
router.post('/login', userController.login)

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ Error: "You are not authentificated" });
    } else {
      jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
          return res.json({ Error: "Token error" });
        } else {
          req.id = decoded.id;
          req.email = decoded.email;
          next();
        }
      });
    }
  };
  
 router.get("/", verifyUser, (req, res) => {
    return res.json({
      Status: "Success",
      email: req.email,
      id: req.id,
    });
  });

module.exports = router;
