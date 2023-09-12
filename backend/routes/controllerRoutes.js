const express = require('express');
const controllerController = require('../controllers/controllerController');
const router = express.Router();

router.get('/', controllerController.findAll);
router.get('/conversation/:id', controllerController.findById);
router.get('/conversation/client/:client', controllerController.findByClient )
router.post('/conversation', controllerController.create);
router.put('/conversation/:id', controllerController.update);
router.delete('/conversation/:id', controllerController.delete);


module.exports = router;