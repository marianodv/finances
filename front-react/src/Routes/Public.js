import Home from "../Pages/Home"
import Movements from "../Pages/Movements"
import CreateMovement from "../Pages/CreateMovement"
import EditMovement from "../Pages/EditMovement"
import NotFound from "../Pages/NotFound"
import {Routes, Route} from "react-router-dom"
import Categories from "../Pages/Categories"
import CreateCategory from "../Pages/CreateCategory"
import EditCategory from "../Pages/EditCategory"

function Public(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movements" element={<Movements />} />
            <Route path="/movements/create/" element={<CreateMovement />} />
            <Route path="/movements/edit/:id" element={<EditMovement />} />
            <Route path="/categories/" element={<Categories />} />
            <Route path="/categories/create" element={<CreateCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Public