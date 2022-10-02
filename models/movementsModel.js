const { DataTypes } = require('sequelize')

const sequelize = require('../config/sequelizedb')

const movementsSchema = sequelize.define('movements',{
    _id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    concept:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:{
                args:[5,70],
                msg:'Debe escribir entre 5 y 70 caracteres en concepto.'
            },
            notNull:{
                args:[true],
                msg:'El campo concepto no puede ser nulo.'
            }
        },
        set(value){
            this.setDataValue('concept',new String(value).toLowerCase())
        }
    },
    amount:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        validate:{
            min:{
                args:[0],
                msg:'El monto mínimo debe ser cero.'
            }
        }
    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            notNull:{
                args:[true],
                msg:'La fecha no puede ser nula.'
            }
        }
    },
    isEgress:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
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

module.exports = movementsSchema