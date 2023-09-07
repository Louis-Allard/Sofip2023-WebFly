const express = require('express');
const entrepriseController = require('../controllers/entrepriseController');
const router = express.Router();

router.get('/', entrepriseController.findAll);
router.get('/entreprise/:id', entrepriseController.findById);
router.post('/entreprise', entrepriseController.create);
router.put('/entreprise/:id', entrepriseController.update);
router.delete('/entreprise/:id', entrepriseController.delete);


module.exports = router;