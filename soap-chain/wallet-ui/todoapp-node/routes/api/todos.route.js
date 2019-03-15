var express = require('express')

var router = express.Router()

var ToDoController = require('../../controllers/bloccwallet.controller');

router.get('/', ToDoController.getTodos)
router.post('/', ToDoController.createTodo)
router.put('/', ToDoController.updateTodo)
router.delete('',ToDoController.removeTodo)

module.exports = router;