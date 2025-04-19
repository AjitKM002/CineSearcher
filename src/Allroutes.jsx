import { Routes,Route } from "react-router-dom"
import { Homepage } from "./pages/Homepage"
import { Favorite } from "./pages/Favorite"
import { NotFound } from "./pages/NotFound"

export const Allroutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Homepage/>}></Route>
            <Route path="/favorites" element={<Favorite/>}></Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}