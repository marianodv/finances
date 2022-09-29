const movementsModel = require('../models/movementsModel')

module.exports = {
    getAll:async (req, res, next) => {
        try{
            const document= await movementsModel.findAll()

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    }
}