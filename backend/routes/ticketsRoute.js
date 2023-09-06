const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");

router.get("/all", ticketsController.findAll);
router.get("/tickets/:id", ticketsController.findById);
router.get("/user/:id", ticketsController.find);

module.exports = router;
