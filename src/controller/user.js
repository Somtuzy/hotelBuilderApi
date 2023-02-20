const UserService = require('../services/user')

class UserController {
    
    // Adding a user
    async addUser(req, res) {
        const { fullname, username, email, password, role, age } = req.body

        try {
            // Check if user exists
            const existingUser = await UserService.getUser({username: username, email: email})
            if(!existingUser){
                // Creates user and sends a success message
                const newUser = await UserService.createUser({fullname: fullname, username: username, email: email, password: password, role: role, age: age})
                res.status(201).send({
                    success: true,
                    message: 'User created successfully!',
                    data: newUser
                })
            } else {
                // Send a forbidden message if user already exists
                res.status(403).send({
                    success: false,
                    message: 'User already exists!'
                })
            }   
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }  
    }

    // Updating a user
    async editUser(req, res) {
        let userName = req.params.username
        const { fullname, username, email, password, role, age } = req.body

        try {
            // Checks if user already exists
            const existingUser = await UserService.getUser({username: userName})

            // Sends a message if the specified user does not exist
            if(!existingUser) {
                return res.status(404).send({
                    success: false,
                    message: 'This user does not exist'
                })
            } else {
                // Updates the user
                const updatedUser = await UserService.updateUser(userName, {username: username, fullname: fullname, email: email, password: password, role: role, age: age})

                // Sends a success message and displays the updated user
                return res.status(200).send({
                    success: true,
                    message: 'User updated successfully!',
                    data: updatedUser
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }     
    }

    // Deleting a user
    async deleteUser(req, res) {
        let username  = req.params.username

        try {
            const existingUser = await UserService.getUser({username: username})

            // Sends a message if the specified user does not exist
            if(!existingUser) {
                return res.status(404).send({
                    success: false,
                    message: 'This user does not exist'
                })
            } else {
                // Deletes the user
                const deletedUser = await UserService.deleteUser(username)
        
                // Sends a success message and displays the deleted user
                return res.status(200).send({
                    success: true,
                    message: 'User deleted successfully!',
                    data: deletedUser
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }  
    }

    // Getting one user by username
    async getUser(req, res) {
        let username = req.params.username

        try {
            const existingUser = await UserService.getUser({username: username})

            // Sends a message if the specified user does not exist
            if(!existingUser) {
                return res.status(404).send({
                    success: false,
                    message: 'This user does not exist'
                })
            } else {
                // Sends a success message and displays user
                return res.status(200).send({
                    success: true,
                    message: 'User fetched successfully!',
                    data: existingUser
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }  
    }

    // Getting all users
    async getUsers(req, res) {

        try {
            const users = await UserService.getUsers()

            // Sends a message if no users exist
            if(!users) {
                return res.status(404).send({
                    success: false,
                    message: 'There are no users on your database'
                })
            } else {
                // Sends a success message and displays users
                return res.status(200).send({
                    success: true,
                    message: 'Users fetched successfully!',
                    data: users
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        } 
    }
}

module.exports = new UserController()