// import { CrudController } from "../controllers/crudController";
const express = require('express')

var router = express();
const CrudController = require("../controllers/crudController");
const bodyparser = require('body-parser');
router.use(bodyparser.json())

router.post('/addNewItem', CrudController.addNewItem);
router.get('/getItem', CrudController.getItem);
router.get('/getItemId/:id', CrudController.getItemId);

router.put('/updateItem/:id', CrudController.updateItem);
router.delete('/deleteItem/:id', CrudController.deleteItem);

module.exports = router;
