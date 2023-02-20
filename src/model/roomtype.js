const {model, Schema} = require("mongoose")


// Creating the roomtype structure also known as schema
const RoomTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }
})

// Modelling the roomtype collection to take on its structure above
const RoomType = model("roomtype", RoomTypeSchema)

module.exports = RoomType;