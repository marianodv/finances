const { Sequelize } = require('sequelize')

const database = 'finances'
const user = 'alkemy'
const password = 'fullstack'
const ipServer = 'localhost'
const port = '14773'

const sequelize = new Sequelize(database,user,password,{
    host:ipServer,
    port:port,
    dialect:'postgres'
})

test = async (error)=>{
    if(error){
        throw error
    }else{
        try{
            await sequelize.authenticate()
            console.log('Connect to postgresql.')
        }catch(error){
            throw error
        }
    }
}

test()

module.exports = sequelize