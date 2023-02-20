const User = require('../model/user')

class UserService {
    async createUser(user) {
       return await User.create(user)
    }

    async updateUser(username, data) {
        return await User.findOneAndUpdate({username: username}, data, {new: true})
    }

    async deleteUser(username) {
        return await User.findOneAndDelete({username: username})
    }

    async getUser(filter) {
        return await User.findOne(filter)
    }

    async getUsers(filter) {
        return await User.find(filter)
    }
}

module.exports = new UserService();