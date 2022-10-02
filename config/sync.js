const sequelize = require('./sequelizedb')

const sincronize = async ()=>{
    await sequelize.sync({force: true})
//sync(): Este método creará un modelo si el modelo no existe, sin embargo, si ya existe, no lo sobrescribirá.
//sync({force: true}) Método: Este método creará un modelo si el modelo no existe, sin embargo, si ya existe, lo sobrescribirá.
    console.log("sincronized!")
}

sincronize();