import { Routes,Route } from "react-router-dom"
import { Homepage } from "./pages/Homepage"
import { Favorite } from "./pages/Favorite"

export const Allroutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="/favorites" element={<Favorite/>}></Route>
        </Routes>
    )
}