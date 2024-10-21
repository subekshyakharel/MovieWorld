import axios from "axios";
const apiKEY = import.meta.env.VITE_APIKEY;
const apiEp = `https://omdbapi.com/?i=tt3896198&apikey=${apiKEY}&`;

export const fetchFromAPI = async (str) => {
  try {
    const url = apiEp + "t=" + str;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
