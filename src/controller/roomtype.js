const RoomTypeService = require('../services/roomtype')


class RoomTypeController {
    async addRoomType(req, res) {
        const { name, description } = req.body

        try {
            // Check if roomtype exists
            const existingRoomType = await RoomTypeService.getRoomType({name: name})
            if(existingRoomType){
                // Send a forbidden message if roomtype already exists
                return res.status(403).send({
                    success: false,
                    message: 'Roomtype already exists!'
                })
            } else {
                // Creates roomtype and sends a success message
                const newRoomType = await RoomTypeService.createRoomType({name: name, description: description})
                return res.status(201).send({
                    success: true,
                    message: 'Roomtype created successfully!',
                    data: newRoomType
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }  
    }


    async editRoomType(req, res) {
        const roomTypeName = req.params.name
        const { name, description } = req.body

        // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
        let regexName = roomTypeName.replace(/[- ]/g, "[- ]?");
        regexName = new RegExp("^" + regexName + "$")
        regexName = {$regex: regexName, $options: 'i'}

        try {
            const existingRoomType = await RoomTypeService.getRoomType({name: regexName})

            // Sends a message if the specified roomtype does not exist
            if(!existingRoomType) {
                return res.status(404).send({
                    success: false,
                    message: 'This roomtype does not exist'
                })
            } else {
                // Updates the roomtype
                const updatedRoomType = await RoomTypeService.updateRoomType(regexName, {name: name, description: description})

                // Sends a success message and displays the updated roomtype
                return res.status(200).send({
                    success: true,
                    message: 'Roomtypes updated successfully!',
                    data: updatedRoomType
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        } 
    }

    // Deleting a roomtype
    async deleteRoomType(req, res) {
        const roomTypeName  = req.params.name

        // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
        let regexName = roomTypeName.replace(/[- ]/g, "[- ]?");
        regexName = new RegExp("^" + regexName + "$")
        regexName = {$regex: regexName, $options: 'i'}

        try {
            const existingRoomType = await RoomTypeService.getRoomType({name: regexName})

            // Sends a message if the specified roomtype does not exist
            if(!existingRoomType) {
                return res.status(404).send({
                    success: false,
                    message: 'This roomtype does not exist'
                })
            } else {
                // Deletes the roomtype
                const deletedRoomType = await RoomTypeService.deleteRoomType(regexName)
                console.log(deletedRoomType);
                // Sends a success message and displays the deleted roomtype
                return res.status(200).send({
                    success: true,
                    message: 'Roomtype deleted successfully!',
                    data: deletedRoomType
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }    
    }


    // Getting one roomtype
    async getRoomType(req, res) {
        const roomTypeName  = req.params.name

        // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
        let regexName = roomTypeName.replace(/[- ]/g, "[- ]?");
        regexName = new RegExp("^" + regexName + "$")
        regexName = {$regex: regexName, $options: 'i'}

        try {
            const existingRoomType = await RoomTypeService.getRoomType({name: regexName})

            // Sends a message if the specified roomtype does not exist
            if(!existingRoomType) {
                return res.status(404).send({
                    success: false,
                    message: 'This roomtype does not exist'
                })
            } else {
                // Sends a success message and displays roomtype
                return res.status(200).send({
                    success: true,
                    message: 'Roomtype fetched successfully!',
                    data: existingRoomType
                })
            }
        } catch (err) {
            res.send({
                error: err,
                message: err.message
            })
        }   
    }


    // Getting all roomtypes
    async getRoomTypes(req, res) {

        try {
            const roomTypes = await RoomTypeService.getRoomTypes()

            // Sends a message if no roomtypes exists
            if(!roomTypes) {
                return res.status(404).send({
                    success: false,
                    message: 'There are no roomtypes on your database'
                })
            } else {
                // Sends a success message and displays roomtypes
                return res.status(200).send({
                    success: true,
                    message: 'Roomtypes fetched successfully!',
                    data: roomTypes
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

module.exports = new RoomTypeController()