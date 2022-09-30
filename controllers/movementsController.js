const movementsModel = require('../models/movementsModel')

module.exports = {
    getAll:async (req, res, next) => {
        try{
            let filters={}
            let document

            if (req.query.limit){
                document= await movementsModel.findAll({where:filters,limit:req.query.limit})
            }else{
                document= await movementsModel.findAll({where:filters})
            }

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getById:async (req, res, next) => {
        try{
            const document= await movementsModel.findByPk(req.params.id)

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    create:async (req, res, next) => {
        try{
            const newMovement = new movementsModel({
                concept:req.body.concept,
                amount:req.body.amount,
                date:req.body.date,
                isEgress:req.body.isEgress
            })

            const document = await newMovement.save()

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    
    modifyById: async(req, res, next) => {
        try{
            
            const document = await movementsModel.update({
                concept:req.body.concept,
                amount:req.body.amount,
                date:req.body.date
            },{
                where:{
                    _id:req.params.id
                }
            })

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    deleteById:  async(req, res, next) => {
       try{
            
            const document = movementsModel.destroy({
                where:{
                    _id:req.params.id
                }
            })

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    }
}