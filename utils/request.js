import axios from "axios";

const request = axios.create({
  baseURL: 'https://api.realworld.io'
});

export default request;

