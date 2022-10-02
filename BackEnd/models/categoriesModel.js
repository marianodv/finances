const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelizedb')

const categoriesSchema = sequelize.define('categories',{
    _id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate:{
            len:{
                args:[3,25],
                msg:'Debe escribir entre 3 y 25 caracteres en nombre de categoria.'
            },
            notNull:{
                args:[true],
                msg:'El campo nombre no puede ser nulo.'
            }
        },
        set(value){
            this.setDataValue('name',new String(value).toLowerCase())
        }
    }
})



module.exports = categoriesSchema