import Home from "../Pages/Home"
import Movements from "../Pages/Movements"
import Detail from "../Pages/Detail"
import {Routes, Route} from "react-router-dom"

function Public(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movements" element={<Movements />} />
            <Route path="/movements/detail/:id" element={<Detail />} />
        </Routes>
    )
}

export default Public