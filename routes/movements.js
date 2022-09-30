var express = require('express');
var router = express.Router();

const movementsController = require('../controllers/movementsController')

/* GET all movements */
router.get('/', movementsController.getAll);

/* POST one movement */
/* require: in body json whit concept(string), amount(decimal), date(date) and isEgress(boolean)*/
router.post('/', movementsController.create);

/* PUT one movement */
/* require: in params: id */
/* require: in body json whit concept(string), amount(decimal), date(date) and isEgress(boolean)*/
router.put('/movement/:id', movementsController.modifyById);

/* GET one movement */
router.get('/movement/:id', movementsController.getById);

/* DELETE one movement */
router.delete('/movement/:id', movementsController.deleteById);

/* DELETE one movement */
router.get('/balance/', movementsController.getBalance);

module.exports = router;
