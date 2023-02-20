const {model, Schema} = require("mongoose")
const bcrypt = require('bcrypt')
const RoomType = require("./roomtype")

// Creating the roomtype structure also known as schema
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['guest', 'admin'],
        default: 'guest'
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
}, {timestamps: true}
)

// Hashing a user's password for extra security
userSchema.pre('save', async function (next){
    if(this.password){
        const salt = await bcrypt.genSalt(10) 
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

// Modelling the roomtype collection to take on its structure above
const User = model("user", userSchema)

// Exporting the Collections so we can use their methods to create rooms and roomtypes
module.exports = User;
