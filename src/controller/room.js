const RoomService = require('../services/room')
const RoomTypeService = require('../services/roomtype')


class RoomController {
    // Adding a room
    async addRoom(req, res) {
        const { codename, roomtype, price, description } = req.body

        try {
            // Checks if room already exists
            const existingRoom = await RoomService.getRoom({codename: codename})

            // Sends a forbidden message if room already exists
            if(existingRoom) {
                return res.status(403).send({
                    success: false,
                    message: 'Room already exists',
                })
            }
            
            // Searches for an existing roomtype with the name provided and creates a room with it
            const searchForRoomType = await RoomTypeService.getRoomType({name: roomtype})
            if(searchForRoomType){
                const newRoom = await RoomService.createRoom({codename: codename, roomtype: searchForRoomType._id, price: price})
                return res.status(201).send({
                    success: true,
                    message: 'Room created succesfully!',
                    data: newRoom
                })
            } else {
                // Sets the roomtype name and description in an object with the details provided and creates a new roomtype
                let roomtypedetails = {}
                roomtypedetails.name = roomtype
                roomtypedetails.description = description
                const roomType = await RoomTypeService.createRoomType(roomtypedetails)

                // Creates room with the new roomtype
                const newRoom = await RoomService.createRoom({codename: codename, price: price, roomtype: roomType._id})
                return res.status(201).send({
                    success: true,
                    message: 'Room created succesfully!',
                    data: newRoom
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }   
    }

    // Updating a room by its id
    async editRoom(req, res) {
        const roomId = req.params.id
        const { codename , price} = req.body

        try {
            // Checks if room exists
            const existingRoom = await RoomService.getRoom({_id: roomId})

            // Sends a forbidden message if room doesn't exist
            if(!existingRoom) {
                return res.status(403).send({
                success: false,
                message: 'Room does not exist',
                })
            }

            // Checks that there's no other room with the new codename 
            if(codename){
                const existingRoomCodeName = await RoomService.getRoom({codename: codename})
                if(existingRoomCodeName === null) {
                    // Updates the room if there's no room with the new room name 
                    const updatedRoom = await RoomService.updateRoom(roomId, {codename: codename, price: price})

                    // Sends a success message
                    return res.status(200).send({
                        success: true,
                        message: 'Room updated succesfully!',
                        data: updatedRoom
                    })
                }  else {
                    // Sends a forbidden message if both ids aren't the same as it means that a room with the new codename already exists
                    return res.status(403).send({
                        success: false,
                        message: 'Room name already exists!',
                    })
                }
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }  
    }


    // Deleting a room by its id
    async deleteRoom(req, res) {
        const roomId = req.params.id

        try {
            // Checks if room exists
            const existingRoom = await RoomService.getRoom({_id: roomId})

            // Sends a forbidden message if room doesn't exist
            if(!existingRoom) {
            return res.status(403).send({
                    success: false,
                    message: 'Room does not exist',
                })
            } else {
                const deletedRoom = await RoomService.deleteRoom(roomId)

                // Sends a success message after deleting the room
                res.status(403).send({
                    success: true,
                    message: 'Room deleted successfully!',
                    data: deletedRoom
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }  
    }

    // Get a single room 
    async getRoom(req, res) {
        const roomId = req.params.id

        try {
            const foundRoom = await RoomService.getRoom({_id: roomId})

            if(!foundRoom){
                return res.status(400).send({
                    success: false,
                    message: 'Room does not exist!'
                })
            } else {
                // Send a success message with the room
                res.status(200).send({
                    success: true,
                    message: 'Room fetched successfully!!',
                    data: foundRoom
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }   
    }

    // Get rooms by filter
    async getRooms(req, res) {

        try {
            // To display all rooms without filter
            let foundRooms = await RoomService.getRooms()

            const codeName = req.query.search
            const roomType = req.query.roomType
            const minPrice = req.query.minPrice
            const maxPrice = req.query.maxPrice

            // Creates an object to store the query values
            let filter = {}
            if (codeName || roomType || minPrice || maxPrice) {

                // Checks which keys were used to query and sets their values as part of the query filter data 
                if (codeName) {
                    let code = codeName.replace(/[- ]/g, "[- ]?");
                    code = new RegExp("^" + code + "$")
                    filter.codename = {$regex: code, $options: 'i'}
                }
                if (roomType) {
                    let type = roomType.replace(/[- ]/g, "[- ]?");
                    type = new RegExp("^" + type + "$")
                    filter.roomtype = {$regex: type, $options: 'i'}
                }
                if (minPrice && maxPrice) filter.price = {$gte: minPrice, $lte: maxPrice}
                else if (minPrice) filter.price = {$gte: minPrice}
                else if (maxPrice) filter.price = {$lte: maxPrice}

                // Uses the entire filter data gathered from the query to look for rooms on the database that match the criteria
                foundRooms = await RoomService.getRooms(filter)

                // Sends a success message and returns the found rooms
                res.status(200).send({
                    success: true,
                    message: 'Here are rooms matching your search criteria',
                    data: foundRooms
                })

            } else {
                res.send({
                    message: 'Here are all rooms below:',
                    data: foundRooms
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

module.exports = new RoomController()