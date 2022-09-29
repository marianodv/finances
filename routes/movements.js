var express = require('express');
var router = express.Router();

const movementsController = require('../controllers/movementsController')

/* GET all movements */
router.get('/', movementsController.getAll);

module.exports = router;
