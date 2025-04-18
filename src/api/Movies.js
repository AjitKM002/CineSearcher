import axios from "axios";

const fetchMovie = async (searchTerm,page) => {
  try {
    const defaultSearch = !searchTerm.trim();
    const baseParams = {
      s: searchTerm || "movie",
      ...(defaultSearch && { y: new Date().getFullYear() }),
      page: page||1,
    };

    const [movieRes, seriesRes] = await Promise.all([
      axios.get("", { params: { ...baseParams, type: "movie" } }),
      axios.get("", { params: { ...baseParams, type: "series" } }),
    ]);

    const movieResult = movieRes.data.Search || [];
    const seriesResult = seriesRes.data.Search || [];

    const totalMovieResults = parseInt(movieRes.data.totalResults || "0", 10);
    const totalSeriesResults = parseInt(seriesRes.data.totalResults || "0", 10);

    return {
      Search: [...movieResult, ...seriesResult],
      totalResults: totalMovieResults + totalSeriesResults,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Search: [], totalResults: 0 };
  }
};

const fetchSingleMovie = async (searchTerm) => {
  try {
    const params = { t: searchTerm };
    const response = await axios.get("", { params });
    return response.data;
  } catch (err) {
    console.log("Error:", err);
    return null;
  }
};

const MovieApi = { fetchMovie, fetchSingleMovie };
export default MovieApi;
