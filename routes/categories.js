var express = require('express');
var router = express.Router();

const categoriesController = require('../controllers/categoriesController')

/* GET all categories */
router.get('/', categoriesController.getAll);

/* POST one category */
/* require: in body json name(string)*/
router.post('/', categoriesController.create);

/* PUT one category */
/* require: in params: id */
/* require: in body json name(string)*/
router.put('/category/:id', categoriesController.modifyById);

/* GET one category */
router.get('/category/:id', categoriesController.getById);

/* DELETE one category */
router.delete('/category/:id', categoriesController.deleteById);

module.exports = router;
