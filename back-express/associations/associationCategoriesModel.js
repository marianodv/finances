const categoriesModel = require('../models/categoriesModel')
const movementsModel = require('../models/movementsModel')

categoriesModel.hasMany(movementsModel,{
    onDelete:'SET NULL',
    onUpdate:'CASCADE'
})

movementsModel.belongsTo(categoriesModel,{
    foreignKey:'categoryId',
    
})
