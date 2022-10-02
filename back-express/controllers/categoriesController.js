const categoriesModel = require('../models/categoriesModel')

module.exports = {
    getAll:async (req, res, next) => { //EJM: localhost:3000/categories/
        try{

            const document = await categoriesModel.findAll({
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
    getById:async (req, res, next) => { //EJM: localhost:3000/categories/category/2
        try{

            const document = await categoriesModel.findByPk(req.params.id)

            res.status(200).json(document)

        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    create:async (req, res, next) => {
        try{
            const newCategory = new categoriesModel({
                name:req.body.name
            })

            const document = await newCategory.save()

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    modifyById: async(req, res, next) => {
        try{
            
            const document = await categoriesModel.update({
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
            
            const document = await categoriesModel.destroy({
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