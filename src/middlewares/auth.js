const { getUser } = require('../controller/user')

const authoriseAdmin = async (req, res, next) => {
    const { username, password } = req.body
    const user = await getUser({username: username})
    const authenticate = await bcrypt.compare(password, user.password)

    if (user && authenticate){
        if(user.role === 'admin'){
            res.status(200).send({
                success: true,
                message: 'action authorised',
                status: 'admin'
            })
            next()
        } else {
            res.status(403).send({
                success: false,
                message: 'action unauthorised',
                status: 'guest'
            })
        }
    }
}

module.exports = authoriseAdmin;