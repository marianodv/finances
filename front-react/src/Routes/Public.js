import Home from "../Pages/Home"
import Movements from "../Pages/Movements"
import {Routes, Route} from "react-router-dom"

function Public(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movements" element={<Movements />} />
        </Routes>
    )
}

export default Public