import React, { useState } from "react";
import {
  Checkbox,
  Button,
  HStack,
} from "@chakra-ui/react";
import useMovieStore from "../stores/MovieStore";

export const Filter = ({ onclose }) => {
  const {
    setFilterOptions,
    applyFilters,
    clearFilters,
    setsearchResult,
    originalSearchResult,
  } = useMovieStore();

  const [year, setYear] = useState("");
  const [types, setTypes] = useState({
    movie: false,
    series: false,
  });

  const toggleType = (type) => {
    setTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleApply = () => {
    const noFilters = !year && !types.movie && !types.series;

    if (noFilters) {
      clearFilters();
      setsearchResult(originalSearchResult);
    } else {
      setFilterOptions({ year, types });
      applyFilters();
    }

    if (onclose) onclose();
  };

  const handleClear = () => {
    clearFilters();
    setsearchResult(originalSearchResult);
    setYear("");
    setTypes({ movie: false, series: false });
    if (onclose) onclose();
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
          <HStack spacing="100">
            <Checkbox
              isChecked={types.movie}
              onChange={() => toggleType("movie")}
              borderColor="gray.300"
            >
              Movie
            </Checkbox>
            <Checkbox
              isChecked={types.series}
              onChange={() => toggleType("series")}
              borderColor="gray.300"
            >
              Series
            </Checkbox>
          </HStack>
        </div>

        <Button colorScheme="blue" onClick={handleApply} width="full">
          Apply
        </Button>
        <Button colorScheme="blue" onClick={handleClear} width="full">
          Clear
        </Button>
      </div>
    </div>
  );
};
