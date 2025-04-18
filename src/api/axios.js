import axios from "axios";

const apiKey = process.env.REACT_APP_OMDB_API_KEY;

const setupHttpHeaders = () => {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

const initializeAxios = () => {
  axios.defaults.baseURL = `https://www.omdbapi.com/?apikey=${apiKey}`;
  setupHttpHeaders();
};

export default initializeAxios;
