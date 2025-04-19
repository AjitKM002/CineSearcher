import {
  InputLeftElement,
  Input,
  InputGroup,
  IconButton,
  Icon,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { CiFilter } from "react-icons/ci";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
import { MovieCard } from "../components/MovieCard";
import { Loader } from "../components/Loader";
import { Filter } from "../components/Filter";
import useMovieStore from "../stores/MovieStore";
import { useSearchParams } from "react-router-dom";

export const MovieList = () => {
  const inputRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("s") || "";
  const initialPage = parseInt(searchParams.get("page"), 10) || 1;

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showFilterComponent, setShowFilterComponent] = useState(false);

  const {
    searchResult,
    loading,
    fetchMovies,
    currentPage,
    setCurrentPage,
    totalResults,
    isFilterActive
  } = useMovieStore();

  const totalPages = Math.max(1, Math.ceil((totalResults || 0) / 10));

  useEffect(() => {
    setCurrentPage(initialPage);
    setDebouncedSearchTerm(initialQuery);
  }, [initialPage, initialQuery, setCurrentPage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);

      setSearchParams(prev => {
        const params = new URLSearchParams(prev);
        if (searchTerm) params.set("s", searchTerm);
        else params.delete("s");
        return params;
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, setCurrentPage, setSearchParams]);

  useEffect(() => {
    if (!isFilterActive) {
      fetchMovies(debouncedSearchTerm, currentPage);
    }
  }, [debouncedSearchTerm, currentPage, fetchMovies, isFilterActive]);

  useEffect(() => {
    const handler = e => {
      if (e.key === "/" && inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };

  return (
    <div className="flex flex-col w-full px-4">
      <div className="w-full flex flex-row items-start">
        <InputGroup variant="outline" width="100%">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Press / to search movies"
            size="md"
            borderRadius="20px"
            border="1px"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <div className="relative ml-2">
          <IconButton
            onClick={() => setShowFilterComponent(v => !v)}
            variant="unstyled"
            icon={<Icon boxSize="7" as={CiFilter} />}
          />
          {showFilterComponent && <Filter onclose={() => setShowFilterComponent(false)} />}
        </div>
      </div>

      <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <div className="fixed flex justify-center items-center inset-0">
            <Loader />
          </div>
        ) : searchResult.length > 0 ? (
          searchResult.map(movie => (
            <MovieCard
              key={movie.imdbID}
              image={movie.Poster}
              title={movie.Title}
              type={movie.Type}
              releaseYear={movie.Year}
            />
          ))
        ) : (
          <div className="fixed flex flex-col justify-center items-center inset-0">
            <p>No movies found.</p>
            <ul>
              <li>Check your connection.</li>
              <li>Search for relevant terms</li>
            </ul>
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
          <HStack spacing={2} mt={6} justify="center" wrap="wrap">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              colorScheme="gray"
              size="sm"
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => {
              const page = index + 1;
              
              let showPage = false;
              
              if (totalPages <= 7) {
                showPage = true;
              } else if (currentPage <= 3) {
                showPage = page <= 5 || page === totalPages;
              } else if (currentPage >= totalPages - 2) {
                showPage = page >= totalPages - 4 || page === 1;
              } else {
                showPage = 
                  Math.abs(currentPage - page) <= 2 || 
                  page === 1 || 
                  page === totalPages;
              }
              
              if (showPage) {
                return (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    size="sm"
                    variant={currentPage === page ? "solid" : "outline"}
                    colorScheme={currentPage === page ? "blue" : "gray"}
                  >
                    {page}
                  </Button>
                );
              }
              
              if (
                (page === 2 && currentPage > 4) ||
                (page === totalPages - 1 && currentPage < totalPages - 3)
              ) {
                return <Text key={page}>...</Text>;
              }
              
              return null;
            })}

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage >= totalPages}
              colorScheme="gray"
              size="sm"
            >
              Next
            </Button>
          </HStack>
        )}
    </div>
  );
};
