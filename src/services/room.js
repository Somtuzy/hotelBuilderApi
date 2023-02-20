const Room = require('../model/room')

class RoomService {
    async createRoom(room) {
        return await Room.create(room)
    }

    async updateRoom(id, data) {
        return await Room.findByIdAndUpdate({_id: id}, data, {new: true})
    }

    async deleteRoom(id) {
        return await Room.findByIdAndDelete({_id: id})
    }

    async getRoom(filter) {
        return await Room.findOne(filter).populate('roomtype')
    }

    async getRooms(filter) {
        return await Room.find(filter).populate('roomtype')
    }
}

module.exports = new RoomService();