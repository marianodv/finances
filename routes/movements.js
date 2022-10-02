var express = require('express');
var router = express.Router();

const movementsController = require('../controllers/movementsController')

/* GET all movements */
router.get('/', movementsController.getAllPaginate);

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

/* GET balance */
router.get('/balance/', movementsController.getBalance);

/* GET incomes */
router.get('/incomes/', movementsController.getIncomes);

/* GET expenses */
router.get('/expenses/', movementsController.getExpenses);

/* GET Top movements */
router.get('/top', movementsController.getTop);

module.exports = router;
