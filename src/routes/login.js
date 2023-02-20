const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../model/user')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const validUser = await User.findOne({username: username})
    const validPassword = await bcrypt.compare(password, validUser.password)

    if(!validUser && !validPassword) {
        return res.status(401).send({
            error: 'invalid username or password',
            status: 'failed'
        })
    }

    const useForToken = {
        username: validUser.username,
        id: validUser._id
    }

    const token = jwt.sign(useForToken, process.env.JWT_SECRET)

    res.status(200).send({
        token: token,
        username: validUser,
        fullname: validUser.fullname,
        message: 'You have logged in successfully!'
    })

})

module.exports = loginRouter;