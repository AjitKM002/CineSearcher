import { useState } from "react";
import { Button } from "@chakra-ui/react";
import useMovieStore from "../stores/MovieStore";

export const Filter = ({ onclose }) => {
  const { originalSearchResult, setsearchResult } = useMovieStore();
  
  const [year, setYear] = useState("");
  const [categories, setCategories] = useState({
    movie: false,
    series: false,
  });

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCategories((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const applyFilter = () => {
    const { movie, series } = categories;

    const noFiltersApplied = !year && !movie && !series;

    if (noFiltersApplied) {
    
      setsearchResult(originalSearchResult);
      if (onclose) onclose();
      return;
    }

    const filtered = originalSearchResult.filter((movieObj) => {
      const matchesYear = year ? movieObj.Year === year : true;
      const matchesType =
        movie && series
          ? true
          : (movie && movieObj.Type === "movie") ||
            (series && movieObj.Type === "series");

      return matchesYear && matchesType;
    });

    setsearchResult(filtered);
  };

  return (
    <div className="absolute right-0 mt-2 h-auto w-64 text-black bg-white rounded-lg shadow-lg p-4 z-10">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="year" className="text-sm font-medium">Year</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder={new Date().getFullYear()}
            className="border bg-inherit border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="category" className="text-sm font-medium">Category</label>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <input
                id="movie"
                type="checkbox"
                checked={categories.movie}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-teal-600"
              />
              <label htmlFor="movie" className="text-sm">Movie</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="series"
                type="checkbox"
                checked={categories.series}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-teal-600"
              />
              <label htmlFor="series" className="text-sm">Series</label>
            </div>
          </div>
        </div>

        <Button colorScheme="blue" onClick={applyFilter} width="full">
          Apply
        </Button>
      </div>
    </div>
  );
};
