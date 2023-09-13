const express = require('express');
const conversationController = require('../controllers/conversationController');
const router = express.Router();

router.get('/', conversationController.findAll);
router.get('/conversation/:id', conversationController.findById);
router.get('/conversation/client/:client', conversationController.findByClient )
router.post('/conversation', conversationController.create);
router.put('/conversation/:id', conversationController.update);
router.delete('/conversation/:id', conversationController.delete);


module.exports = router;