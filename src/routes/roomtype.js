const express = require("express")
const RoomTypeController = require("../controller/roomtype")
const { validateRoomTypeInputs } = require('../validation/index')
const authoriseAdmin = require('../middlewares/auth')

const router = express.Router()

router.post('/create', validateRoomTypeInputs, authoriseAdmin, RoomTypeController.addRoomType)
router.get('/:name', RoomTypeController.getRoomType)
router.patch('/:name', authoriseAdmin, RoomTypeController.editRoomType)
router.get('/', RoomTypeController.getRoomTypes)
router.delete('/:name', authoriseAdmin, RoomTypeController.deleteRoomType)

module.exports = router;