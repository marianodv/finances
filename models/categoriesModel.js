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



const sincronize = async ()=>{
    await sequelize.sync()
/**
 *  sync(): Este método creará un modelo si el modelo no existe, sin embargo, si ya existe, no lo sobrescribirá.
 *  sync({force: true}) Método: Este método creará un modelo si el modelo no existe, sin embargo, si ya existe, lo sobrescribirá.
 */
    console.log("sincronized!")
}

sincronize();

module.exports = categoriesSchema