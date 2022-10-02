const movementsModel = require('../models/movementsModel')
const { Op } = require("sequelize");

module.exports = {
    getAllPaginate:async (req, res, next) => { //EJM: localhost:3000/movements/?page=3&size=4
        try{

            //const {page,size} = req.query

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
                offset: page*size
            })
            
            document.page = page + 1
           
            if (parseInt(document.count/size) < (document.count/size)){
                document.pages = parseInt(document.count/size)+1
            }else{
                document.pages = parseInt(document.count/size) 
            }

            document.rowsPerPage = size

            res.status(200).json(document)



            /*
            let filters={}
            let document
            let aux={}

            //queryFind={$or:[{name:{$regex:".*"+cadena+".*",$options:"i"}},{id:idSearch}]} 
            if(req.query.dateFrom && req.query.dateTo){
                aux.date={
                    [Op.and]:[
                        {[Op.gte]:req.query.dateFrom},
                        {[Op.lte]:req.query.dateTo}
                    ]
                }    
            }else if(req.query.dateFrom){
                aux.date={[Op.gte]:req.query.dateFrom}
            }else if(req.query.dateTo){
                aux.date={[Op.lte]:req.query.dateTo}
            }

            if(req.query.amountFrom && req.query.amountTo){
                aux.amount={
                    [Op.and]:[
                        {[Op.gte]:req.query.amountFrom},
                        {[Op.lte]:req.query.amountTo}
                    ]
                }    
            }else if(req.query.amountFrom){
                aux.amount={[Op.gte]:req.query.amountFrom}
            }else if(req.query.amountTo){
                aux.amount={[Op.lte]:req.query.amountTo}
            }

            if(req.query.name){
                aux.name={[Op.like]:'%'+ (new String(req.query.name).replace(" ","%")) +'%'}
            }



            if (req.query.limit){
                document= await movementsModel.findAll({
                    where:filters,
                    limit:req.query.limit
                })
            }else{
                document= await movementsModel.findAll({
                    where:filters
                })
            }

            
            console.log("AUC: ", aux)
            
            res.status(200).json(document)*/
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
    getTop:async (req, res, next) => {
        try{
            const document= await movementsModel.findAll({
                limit:10,
                order:[
                    ['updatedAt', 'DESC']
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
    getExpenses:async (req, res, next) => {
        try{
            const expenses = await movementsModel.findAll({
                where:{
                    isEgress:true
                }
            })

            res.status(200).json(expenses)
        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getIncomes:async (req, res, next) => {
        try{
            const incomes = await movementsModel.findAll({
                where:{
                    isEgress:false
                }
            })

            res.status(200).json(incomes)
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