const express = require('express');
const adresseController = require('../controllers/adresseController');
const router = express.Router();

router.get('/', adresseController.findAll);
router.get('/adresse/:id', adresseController.findById);
router.post('/adresse', adresseController.create);
router.put('/adresse/:id', adresseController.update);
router.delete('/adresse/:id', adresseController.delete);


module.exports = router;