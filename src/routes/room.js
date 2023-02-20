const express = require("express")
const RoomController = require("../controller/room")
const { validateRoomInputs } = require('../validation/index')
const authoriseAdmin = require('../middlewares/auth')
const loginRouter = require("./login")

const router = express.Router()
router.use(loginRouter)
router.post('/create', validateRoomInputs, authoriseAdmin, RoomController.addRoom)
router.get('/:id', RoomController.getRoom)
router.patch('/:id', authoriseAdmin, RoomController.editRoom)
router.get('/', RoomController.getRooms)
router.delete('/:id', authoriseAdmin, RoomController.deleteRoom)

module.exports = router;