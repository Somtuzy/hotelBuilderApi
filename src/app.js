const express = require("express")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
const rootRouter = require("./routes/index")
const loginRouter = require("./routes/login")
const Room = require('./model/room')


// Getting access to the .env file for the database link
require("dotenv").config()
const Uri = process.env.MONGODB_URI

// Creating a server
const app = express()

// Allows us to send and receive json files 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Lets the server listen on all files
app.use('/api/v1', rootRouter)
app.use('/api/v1/login', loginRouter, async () => {
    console.log('You are logged in');
    const rooms = await Room.find().populate('roomtype')
    res.status(200).send({
        message: rooms
    })
})

// Connects to the database
mongoose.connect(Uri, {
    dbName: "hotelBuilder",
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch(err => console.log(err,':', err.message))

const port = process.env.PORT || 3000
// Server listening for requests
app.listen(port, () => console.log(`Server connected to port ${port}`))
