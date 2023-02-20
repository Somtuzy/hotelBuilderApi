const router = require('express').Router()
const roomRouter = require('./room')
const roomTypeRouter = require('./roomtype')
const userRouter = require('./user')


router.use('/rooms', roomRouter)
router.use('/roomtypes', roomTypeRouter)
router.use('/', userRouter)

module.exports = router;