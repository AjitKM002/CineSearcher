import { Text, 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge } from "@chakra-ui/react";
import MovieApi from "../api/Movies";
import { useRef, useState } from "react";
import { Loader } from "./Loader";
import useMovieStore from "../stores/MovieStore";
import { FavButton } from "./FavButton";

export const MovieCard = ({ image, title, type, releaseYear }) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [response,setResponse]=useState([]);
  const [loading,setLoading]=useState(true);

  const addMovie=useMovieStore((state)=>state.addMovie);

  const fetchSingleMovie=async (title)=>{
    try{
      const data=await MovieApi.fetchSingleMovie(title);
      setResponse(data);
      console.log(data);
      addMovie(data);
    }catch(err){
      console.log("Error:",err)
    }finally{
      setLoading(false);
    }
  }



  const handleDetail=()=>{
    fetchSingleMovie(title);
    onOpen();
  }
    
  return (
    <div className="flex flex-col  items-center border-2 text-black border-white rounded-lg p-4 bg-gray-200 shadow-lg ">
      <img src={image==="N/A"?"/cinesearcher.png":image} alt={title} onError={(e)=>{
        e.target.onerror = null; 
        e.target.src = "/cinesearcher.png"; 
      }} className="w-56 h-72 object-cover rounded-md" />

      <div className="text-left w-full mt-4">
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="black.200">
          {type} • {releaseYear}
        </Text>
      </div>

      <Button 
        width="full" 
        variant="outline" 
        mt={3}
        color="black"
        _hover={{ bg: "blue.300" }}
        onClick={handleDetail}
      >
        View Details
      </Button>
      <Modal size={{base:"xl",md:"2xl",lg:"4xl"}} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="flex flex-col items-start">
            <div className="flex flex-row items-center">
              {title}
              <FavButton imdbID={response?.imdbID} Title={response?.Title} Rating={response?.imdbRating} />
            </div>
            
            <div className="inline-block">
              
              {
              response?.Genre ? (
                response.Genre.split(",").map((genre, index) => (
                  <Badge key={index} variant="solid" borderRadius="15px" colorScheme="green" mx={1}>
                    {genre.trim()}
                  </Badge>
                ))
                ) : (
                  <Text color="gray.400">No Genre Available</Text>
                )}
            </div>
          </ModalHeader>       
          <ModalCloseButton />
          <ModalBody>
          {
            loading?<div className="absolute flex justify-center items-center inset-0">
            <Loader />
        </div>:
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 w-full">
          <img 
            src={response?.Poster && response.Poster !== "NA" ? response.Poster : "/cinesearcher.png"} 
            alt="Movie Poster" 
            className="w-full max-w-xs md:w-72 h-auto object-cover rounded-md"
            />

          <div className="flex flex-col flex-1 text-center md:text-left">
            <p className="mb-4">{response.Plot}</p> 
              <ul className="space-y-2 text-sm md:text-base text-left">
                <li><strong>Director:</strong> {response.Director}</li>
                <li><strong>Actors:</strong> {response.Actors}</li>
                <li><strong>Box Office:</strong> {response.BoxOffice}</li>
                <li><strong>Year:</strong> {response.Year}</li>
                <li><strong>Runtime:</strong> {response.Runtime}</li>
                <li><strong>Language:</strong> {response.Language}</li>
                <li><strong>Rated:</strong> {response.Rated}</li>
              </ul>
          </div>
        </div>
          }
      
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
