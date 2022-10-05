import Home from "../Pages/Home"
import Movements from "../Pages/Movements"
import Detail from "../Pages/Detail"
import CreateMovement from "../Pages/CreateMovement"
import EditMovement from "../Pages/EditMovement"
import NotFound from "../Pages/NotFound"
import {Routes, Route} from "react-router-dom"

function Public(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movements" element={<Movements />} />
            <Route path="/movements/create" element={<CreateMovement />} />
            <Route path="/movements/detail/:id" element={<Detail />} />
            <Route path="/movements/edit/:id" element={<EditMovement />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Public