import axios from "axios";

const fetchFood = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  headers: {
    Accept: "application/json",
  },
});

export default fetchFood;
