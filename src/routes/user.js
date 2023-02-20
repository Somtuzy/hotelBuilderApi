const express = require("express")
const UserController = require('../controller/user')
const { validateUserInputs } = require('../validation/index')
const authoriseAdmin = require('../middlewares/auth')


const router = express.Router()

router.post('/register', validateUserInputs, UserController.addUser)
router.get('/:username', UserController.getUser)
router.patch('/:username', UserController.editUser)
router.get('/users', authoriseAdmin, UserController.getUsers)
router.delete('/:username', UserController.deleteUser)

module.exports = router;