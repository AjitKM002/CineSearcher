import { IconButton,Tooltip,useBreakpointValue } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import useMovieStore from "../stores/MovieStore";

export const FavButton = ({ imdbID, Title,Rating }) => {
  const { favMovies, addFavMovie, removeFavMovie } = useMovieStore();
  const isFav = favMovies.some((movie) => movie.id === imdbID);
  const placement = useBreakpointValue({ base: "bottom", md: "right" });

  const handleIconClick = () => {
    if (isFav) {
      removeFavMovie(imdbID);
    } else {
      addFavMovie({ imdbID, Title,Rating });
    }
  };

  return (
    <Tooltip label="Add to Favorites"  placement={placement} bg="black" color="white" borderRadius="7px" p="3" hasArrow>
      <IconButton
      variant="unstyled"
      onClick={handleIconClick}
      colorScheme="teal"
      aria-label="Toggle Favorite"
      size="lg"
      icon={<StarIcon color={isFav ? "gold" : "gray.400"} />}
      />
    </Tooltip>
  );
};
