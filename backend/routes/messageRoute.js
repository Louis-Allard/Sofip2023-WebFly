
const express = require("express");
const router = express.Router();
const messController = require("../controllers/messController");


router.get("/messages/:id",messController.findById)
router.get("/all/:id",messController.findAllByTicket)

module.exports = router;