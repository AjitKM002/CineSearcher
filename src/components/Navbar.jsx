import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <div className="flex flex-col  w-full my-10 px-4">
      <div className="w-full max-w-xl">
        <nav className="flex items-center justify-evenly w-full">
          <Text fontSize="2xl" fontWeight="bold">
            CineSearcher
          </Text>
          <Link to="/" className="hover:underline">Home</Link>
            <Link to="/favorites" className="hover:underline">Favorites</Link>
        
        </nav>
        
      </div>
      <div className="h-px bg-black w-full my-3" />
    </div>
  );
};
