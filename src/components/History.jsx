import { Text,IconButton,Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useMovieStore from "../stores/MovieStore";


export const History = () => {
  const { movies,removeMovie,removeAll } = useMovieStore();

  return (
    <div className="flex flex-col w-full md:w-3/12 gap-3 text-left p-4 rounded-lg max-h-[80vh] overflow-y-auto">
      <div className="flex flex-row justify-between">
        <Text fontSize="xl" fontWeight="bold" mb={2}>History</Text>
        <Button variant="ghost" colorScheme="red" onClick={removeAll}>Clear All</Button>
      </div>
      {movies.map((m) => (
        <div
          key={m.id}
          className="flex flex-row justify-between bg-green-600 p-4 rounded-lg hover:bg-blue-600 transition duration-300 text-white"
        >
          <Text>{m.title}</Text>
          <IconButton
          variant="ghost"
          onClick={()=>removeMovie(m)}
          aria-label="delete"
          icon={<DeleteIcon color="red.300" />}
           />
        </div>
      ))}
    </div>
  );
};
