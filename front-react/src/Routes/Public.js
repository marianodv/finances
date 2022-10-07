import Home from "../Pages/Home"
import Movements from "../Pages/Movements"
import CreateMovement from "../Pages/CreateMovement"
import EditMovement from "../Pages/EditMovement"
import NotFound from "../Pages/NotFound"
import {Routes, Route} from "react-router-dom"
import Categories from "../Pages/Categories"
import CreateCategory from "../Pages/CreateCategory"

function Public(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movements" element={<Movements />} />
            <Route path="/movements/create/:op" element={<CreateMovement />} />
            <Route path="/movements/create/" element={<CreateMovement />} />
            <Route path="/movements/edit/:id" element={<EditMovement />} />
            <Route path="/categories/" element={<Categories />} />
            <Route path="/categories/new" element={<CreateCategory />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Public