const movementsModel = require('../models/movementsModel')
const categoriesModel = require('../models/categoriesModel')
const { Op } = require("sequelize");

const ordenateBy = [
    ['date', 'DESC'],
    ['updatedAt','DESC']
]

module.exports = {
    getAllPaginate:async (req, res, next) => { //EJM: localhost:3000/movements/?page=3&size=4
        try{

            let page = parseInt(req.query.page)-1
            let size = parseInt(req.query.size)

            if (isNaN(page) || page == null || page < 0) {
                page = 0
            }

            if (isNaN(size) || size == null || size < 0 || size > 200) {
                size = 25
            }

            let document = await movementsModel.findAndCountAll({
                limit:size,
                offset: page*size,
                order:ordenateBy,
                include:categoriesModel
            })
            
            document.page = page + 1
           
            if (parseInt(document.count/size) < (document.count/size)){
                document.pages = parseInt(document.count/size)+1
            }else{
                document.pages = parseInt(document.count/size) 
            }

            document.rowsPerPage = size

            let pagePrev,pageNext
            if (document.page > 1){
                pagePrev = document.page - 1
            }else{
                pagePrev = 1
            }
            if (document.page < document.pages){
                pageNext = document.page + 1
            }else{
                pageNext = document.pages
            }

            res.status(200).json({
                rowsCount:document.count,
                pageMin:1,
                pageMax:document.pages,
                page:document.page,
                rowsPerPage:document.rowsPerPage,
                pagePrev,
                pageNext,
                rows:document.rows
            })

        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getById:async (req, res, next) => {
        try{
            const document= await movementsModel.findByPk(
                req.params.id,
                {
                    include:categoriesModel
                }
            )

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
                order:ordenateBy,
                include:categoriesModel
            })

            console.log(document)
            
            res.status(200).json(document)

        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getByCategoryPaginate:async (req, res, next) => {
        try{
            
            let page = parseInt(req.query.page)-1
            let size = parseInt(req.query.size)
            let idCat = parseInt(req.params.id)

            if (isNaN(idCat) || idCat == null || idCat < 0) {
                idCat = 0
            }

            if (isNaN(page) || page == null || page < 0) {
                page = 0
            }

            if (isNaN(size) || size == null || size < 0) {
                size = 25
            }
            
            let document = await movementsModel.findAndCountAll({
                limit:size,
                offset: page*size,
                order:ordenateBy,
                include:categoriesModel,
                where:{categoryId:idCat}
            })
            
            document.page = page + 1
           
            if (parseInt(document.count/size) < (document.count/size)){
                document.pages = parseInt(document.count/size)+1
            }else{
                document.pages = parseInt(document.count/size) 
            }

            document.rowsPerPage = size

            let pagePrev,pageNext
            if (document.page > 1){
                pagePrev = document.page - 1
            }else{
                pagePrev = 1
            }
            if (document.page < document.pages){
                pageNext = document.page + 1
            }else{
                pageNext = document.pages
            }

            res.status(200).json({
                rowsCount:document.count,
                pageMin:1,
                pageMax:document.pages,
                page:document.page,
                rowsPerPage:document.rowsPerPage,
                pagePrev,
                pageNext,
                rows:document.rows
            })

        }catch (error){
            console.log("Error: ", error)
            next(error)
        }
    },
    getTop:async (req, res, next) => {
        try{
            const document= await movementsModel.findAll({
                limit:10,
                order:ordenateBy,
                include:categoriesModel
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
                order:ordenateBy,
                include:categoriesModel
            })

            document.page = page + 1
           
            if (parseInt(document.count/size) < (document.count/size)){
                document.pages = parseInt(document.count/size)+1
            }else{
                document.pages = parseInt(document.count/size) 
            }

            document.rowsPerPage = size

            let pagePrev,pageNext
            if (document.page > 1){
                pagePrev = document.page - 1
            }else{
                pagePrev = 1
            }
            if (document.page < document.pages){
                pageNext = document.page + 1
            }else{
                pageNext = document.pages
            }

            res.status(200).json({
                rowsCount:document.count,
                pageMin:1,
                pageMax:document.pages,
                page:document.page,
                rowsPerPage:document.rowsPerPage,
                pagePrev,
                pageNext,
                rows:document.rows
            })

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
                order:ordenateBy,
                include:categoriesModel
            })

            document.page = page + 1
           
            if (parseInt(document.count/size) < (document.count/size)){
                document.pages = parseInt(document.count/size)+1
            }else{
                document.pages = parseInt(document.count/size) 
            }

            document.rowsPerPage = size

            let pagePrev,pageNext
            if (document.page > 1){
                pagePrev = document.page - 1
            }else{
                pagePrev = 1
            }
            if (document.page < document.pages){
                pageNext = document.page + 1
            }else{
                pageNext = document.pages
            }
            
            res.status(200).json({
                rowsCount:document.count,
                pageMin:1,
                pageMax:document.pages,
                page:document.page,
                rowsPerPage:document.rowsPerPage,
                pagePrev,
                pageNext,
                rows:document.rows
            })

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
                isEgress:req.body.isEgress,
                categoryId:req.body.categoryId
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
            //console.log("BODY:",req.body)
            const document = await movementsModel.update({
                concept:req.body.concept,
                amount:req.body.amount,
                date:req.body.date,
                categoryId:req.body.categoryId
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