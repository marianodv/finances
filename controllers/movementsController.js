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
    getBalance:async (req, res, next) => {
        try{
            const income= await movementsModel.sum('amount',{where:{isEgress:false}})

            const expenses = await movementsModel.sum('amount',{where:{isEgress:true}})

            res.status(200).json(income - expenses)
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