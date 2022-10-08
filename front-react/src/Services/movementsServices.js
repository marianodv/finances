import axios from "../Config/axios"

export async function getTopMovements(){
    return await axios.get('/movements/top/')
}

export async function getAll(page){
    if (page){
        return await axios.get('/movements/?page=' + page)
    }else{  
        return await axios.get('/movements/')
    }
}

export async function getIncomes(page){
    if (page){
        return await axios.get('/movements/incomes/?page=' + page)
    }else{  
        return await axios.get('/movements/incomes/')
    }
}

export async function getExpenses(page){
    if (page){
        return await axios.get('/movements/expenses/?page=' + page)
    }else{  
        return await axios.get('/movements/expenses/')
    }
}

export async function getByCategory(id,page){
    if (page){
        return await axios.get('/movements/category/' + id + '?page=' + page)
    }else{  
        return await axios.get('/movements/category/' + id)
    }
}

export async function getById(id){
    return await axios.get('/movements/movement/' + id)
}

export async function postMovement(data){
    return await axios.post("/movements/",data)
}

export async function deleteById(id){
    return await axios.delete('/movements/movement/' + id)
}

export async function updateById(id,data){
    return await axios.put('/movements/movement/' + id,data)
}