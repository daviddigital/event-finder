import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => { 
    console.error("An error occurred, please try again. Technical details: ", error);
    return Promise.reject(error);
  }
);

export default api;
