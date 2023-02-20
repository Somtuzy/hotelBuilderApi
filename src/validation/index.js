const userSchema = require('./user')
const roomSchema = require('./room')
const roomTypeSchema = require('./roomtype')

const validateUserInputs = (req, res, next) => {
    const validateUser = userSchema.validate(req.body)

    if(validateUser.error) res.status(400).send({
        success: false,
        status: 'failed',
        errormessage: validateUser.error.details[0].message
    })
    next()
}

const validateRoomInputs = (req, res, next) => {
    const validateRoom = roomSchema.validate(req.body)

    if(validateRoom.error) res.status(400).send({
        success: false,
        status: 'failed',
        errormessage: validateRoom.error.details[0].message
    })
    next()
}


const validateRoomTypeInputs = (req, res, next) => {
    const validateRoomType = roomTypeSchema.validate(req.body)

    if(validateRoomType.error) res.status(400).send({
        success: false,
        status: 'failed',
        errormessage: validateRoomType.error.details[0].message
    })
    next()
}

module.exports = { validateUserInputs, validateRoomInputs, validateRoomTypeInputs };