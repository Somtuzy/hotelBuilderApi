const RoomType = require('../model/roomtype')

class RoomTypeService {
    async createRoomType(roomtype) {
       return await RoomType.create(roomtype)
    }

    async updateRoomType(name, data) {
        return await RoomType.findOneAndUpdate({name: name}, data, {new: true})
    }

    async deleteRoomType(name) {
        return await RoomType.findOneAndDelete({name: name})
    }

    async getRoomType(filter) {
        return await RoomType.findOne(filter)
    }

    async getRoomTypes(filter) {
        return await RoomType.find(filter)
    }
}

module.exports = new RoomTypeService();