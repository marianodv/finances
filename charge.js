const sequelize = require('./config/sequelizedb')
const categoriesModel = require('./models/categoriesModel')
const movementsModel = require('./models/movementsModel')
const assCategoriesModel = require('./associations/associationCategoriesModel')


const sincronize = async ()=>{
    await sequelize.sync({force: true})
    console.log("sincronized!")
}

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function ranbomBoolean() {
  let min = 1
  let max = 2
  
  if (Math.floor((Math.random() * (max - min + 1)) + min) == 1){
    return true
  }else{
    return false
  }
}

const chargeCategories = async () => {
  try{

      //const dest = await categoriesModel.destroy() //({where:{[Op.gte]:{_id:0}}}

      for (let i = 1; i <= 100; i++){
        const newCategory = new categoriesModel({
          name:'My Category ' + i
        })

        const document = await newCategory.save()

        console.log(document," - ", random(1,100))
      } 
  }catch (error){
      console.log("Error: ", error)
      throw error
  }
}

const chargeMovements = async () => {
  try{

    for(let i = 1; i <= 200; i++){
      const newMovement = new movementsModel({
        concept: 'My Movement ' + i,
        amount:random(100,10000),
        isEgress:ranbomBoolean(),
        categoryId:random(1,100)
      })

      const document = await newMovement.save()

      console.log(document)
    }
  }catch (error){
      console.log("Error: ", error)
      throw error
  }
}


const chargeAll = async () => {
  await sincronize()
  await chargeCategories()
  await chargeMovements()
}

chargeAll()