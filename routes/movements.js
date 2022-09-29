var express = require('express');
var router = express.Router();

const movementsController = require('../controllers/movementsController')

/* GET all movements */
router.get('/', movementsController.getAll);

/* POST one movement */
/* require: in body json whit concept(string), amount(decimal) and isEgress(boolean)*/
router.post('/', movementsController.create);

module.exports = router;
