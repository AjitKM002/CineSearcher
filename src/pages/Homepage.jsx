import { MovieList } from "./MovieList"
import { History } from "../components/History"


export const Homepage=()=>{
    return(
        <div className='flex flex-col md:flex-row w-full gap-1 my-3.5'>  
            <MovieList/>
            <div className="w-px bg-gray-300 h-auto mx-2" />
            <History/>
        </div>
    )
}