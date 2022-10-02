const categoriesController = require('../models/categoriesModel')
const { Op } = require("sequelize");

module.exports = {
    getAll:async (req, res, next) => { //EJM: localhost:3000/categories/
        try{

            let document = await categoriesController.findAll({
                order:[
                    ['name', 'ASC']
                ]
            })

            res.status(200).json(document)

        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    create:async (req, res, next) => {
        try{
            const newCategory = new categoriesController({
                name:req.body.name
            })

            const document = await categoriesController.save()

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    modifyById: async(req, res, next) => {
        try{
            
            const document = await categoriesController.update({
                name:req.body.name
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
            
            const document = categoriesController.destroy({
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