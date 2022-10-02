const movementsModel = require('../models/movementsModel')
const { Op } = require("sequelize");

module.exports = {
    getAllPaginate:async (req, res, next) => { //EJM: localhost:3000/movements/?page=3&size=4
        try{

            let page = parseInt(req.query.page)-1
            let size = parseInt(req.query.size)

            if (isNaN(page) || page == null || page < 0) {
                page = 0
            }

            if (isNaN(size) || size == null || size < 0) {
                size = 25
            }

            let document = await movementsModel.findAndCountAll({
                limit:size,
                offset: page*size,
                order:[
                    ['date', 'DESC'],
                    ['updatedAt','DESC']
                ]
            })
            
            document.page = page + 1
           
            if (parseInt(document.count/size) < (document.count/size)){
                document.pages = parseInt(document.count/size)+1
            }else{
                document.pages = parseInt(document.count/size) 
            }

            document.rowsPerPage = size

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
    getSearch:async (req, res, next) => {
        try{
            
            let filters={_id:{[Op.lt]:0}} //para no obtener resultados en caso de no mandar req.query.concept (busco id < 0)

            if (req.query.concept){
                filters = {concept:{
                        [Op.like]: "%" + new String(req.query.concept).replace(" ","%") + "%"
                    }
                }
            }

            const document = await movementsModel.findAll({
                where:filters,
                order:[
                    ['date', 'DESC'],
                    ['updatedAt','DESC']
                ]
            })

            console.log(document)
            
            res.status(200).json(document)

        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getTop:async (req, res, next) => {
        try{
            const document= await movementsModel.findAll({
                limit:10,
                order:[
                    ['date', 'DESC'],
                    ['updatedAt','DESC']
                ]
            })

            res.status(200).json(document)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getBalance:async (req, res, next) => {
        try{
            const income= await movementsModel.sum('amount',{
                where:{
                    isEgress:false
                }
            })

            const expenses = await movementsModel.sum('amount',{
                where:{
                    isEgress:true
                }
            })

            res.status(200).json(income - expenses)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getExpensesPaginate:async (req, res, next) => { //EJM: localhost:3000/movements/expenses/?page=3&size=4
        try{

            let page = parseInt(req.query.page)-1
            let size = parseInt(req.query.size)

            if (isNaN(page) || page == null || page < 0) {
                page = 0
            }

            if (isNaN(size) || size == null || size < 0) {
                size = 25
            }

            let document = await movementsModel.findAndCountAll({
                where:{
                    isEgress:true
                },
                limit:size,
                offset: page*size,
                order:[
                    ['date', 'DESC'],
                    ['updatedAt','DESC']
                ]
            })

            document.page = page + 1
           
            if (parseInt(document.count/size) < (document.count/size)){
                document.pages = parseInt(document.count/size)+1
            }else{
                document.pages = parseInt(document.count/size) 
            }

            document.rowsPerPage = size

            res.status(200).json(document)

        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getIncomesPaginate:async (req, res, next) => { //EJM: localhost:3000/movements/incomes/?page=3&size=4
        try{

            let page = parseInt(req.query.page)-1
            let size = parseInt(req.query.size)

            if (isNaN(page) || page == null || page < 0) {
                page = 0
            }

            if (isNaN(size) || size == null || size < 0) {
                size = 25
            }

            let document = await movementsModel.findAndCountAll({
                where:{
                    isEgress:false
                },
                limit:size,
                offset: page*size,
                order:[
                    ['date', 'DESC'],
                    ['updatedAt','DESC']
                ]
            })

            document.page = page + 1
           
            if (parseInt(document.count/size) < (document.count/size)){
                document.pages = parseInt(document.count/size)+1
            }else{
                document.pages = parseInt(document.count/size) 
            }

            document.rowsPerPage = size

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
            
            const document = await movementsModel.destroy({
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