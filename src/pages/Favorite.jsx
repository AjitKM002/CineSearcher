import { Text, IconButton } from "@chakra-ui/react";
import useMovieStore from "../stores/MovieStore";
import { DeleteIcon } from "@chakra-ui/icons";

export const Favorite = () => {
  const { favMovies, removeFavMovie } = useMovieStore();

  return (
    <div className="flex flex-col px-4 items-center w-full gap-6">
      <div className="flex flex-col w-full md:w-9/12 lg:w-5/12 gap-4">
        {favMovies.map((m) => (
          <div
            key={m.id}
            className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between bg-blue-950 py-5 px-6 rounded-lg border-l-4 border-white"
          >
            <Text fontSize="lg" fontWeight="semibold" color="white">
              {m.title}
            </Text>

            <div className="flex flex-row items-center gap-4 mt-2 sm:mt-0">
              <Text color="gray.200"><span className="font-semibold">Rating</span>: {m.rating}/10</Text>
              <IconButton
                variant="ghost"
                onClick={() => removeFavMovie(m.id)}
                aria-label="Delete"
                icon={<DeleteIcon color="red.300" />}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
