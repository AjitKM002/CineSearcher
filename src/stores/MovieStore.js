import { create } from "zustand";
import MovieApi from "../api/Movies";

const useMovieStore = create((set,get) => ({
  
  movies: JSON.parse(localStorage.getItem("MovieHistory")) || [],
  favMovies: JSON.parse(localStorage.getItem("FavMovies")) || [],
  searchResult: [],
  originalSearchResult: [],
  loading: true,
  currentPage:1,
  lastFetchedTerm: "",
  setCurrentPage: (page) => set({ currentPage: page }),  
  totalResults: 0,

  fetchMovies: async (term = "", currentPage) => {
    const state=get()
    const page=state.currentPage
    set({ loading: true });
  
    try {
      const data = await MovieApi.fetchMovie(term, page);
      console.log("data fetched for:",currentPage)
      set({
        searchResult: data.Search,
        originalSearchResult: data.Search,
        lastFetchedTerm: term,
        totalResults: data.totalResults||0,
        currentPage: currentPage,
      });
    } catch (err) {
      console.error("Error fetching movies:", err);
      set({ searchResult: [], originalSearchResult: [] });
    } finally {
      set({ loading: false });
    }
  },  
  setsearchResult: (result) => set({ searchResult: result }),
  addMovie: (movie) =>
    set((state) => {
      const newMovie = { id: movie.imdbID, title: movie.Title };
      const updatedHistory = [
        ...state.movies.filter((m) => m.id !== newMovie.id),
        newMovie,
      ];
      localStorage.setItem("MovieHistory", JSON.stringify(updatedHistory));
      return { movies: updatedHistory };
    }),

  addFavMovie: ({ imdbID, Title ,Rating}) =>
    set((state) => {
      const newFav = { id: imdbID, title: Title,rating:Rating };
      const favList = [
        ...state.favMovies.filter((m) => m.id !== newFav.id),
        newFav,
      ];
      localStorage.setItem("FavMovies", JSON.stringify(favList));
      return { favMovies: favList };
    }),

  removeFavMovie: (id) =>
    set((state) => {
      const updatedFavs = state.favMovies.filter((m) => m.id !== id);
      localStorage.setItem("FavMovies", JSON.stringify(updatedFavs));
      return { favMovies: updatedFavs };
    }),

  removeMovie: (movie) =>
    set((state) => {
      const updatedHistory = state.movies.filter(
        (m) => m.id !== movie.id
      );
      localStorage.setItem("MovieHistory", JSON.stringify(updatedHistory));
      return { movies: updatedHistory };
    }),

  removeAll: () =>
    set(() => {
      localStorage.removeItem("MovieHistory");
      return { movies: [] };
    }),
}));

export default useMovieStore;
