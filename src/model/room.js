const {model, Schema} = require("mongoose")
const ObjectId = Schema.Types.ObjectId
const RoomType = require('./roomtype')

// Creating the room structure also known as schema
const roomSchema = new Schema({
    codename: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    roomtype: {
        type: ObjectId,
        ref: RoomType,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

// Modelling the roomtype collection to take on its structure above
const Room = model("room", roomSchema)

// Exporting the model to create rooms
module.exports = Room
