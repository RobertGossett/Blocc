var express = require('express')

var router = express.Router()

var BloccWalletController = require('../../controllers/bloccwallet.controller');

router.get('/', BloccWalletController.getTodos)
router.post('/', BloccWalletController.createTodo)
router.put('/', BloccWalletController.updateTodo)
router.delete('',BloccWalletController.removeTodo)

module.exports = router;