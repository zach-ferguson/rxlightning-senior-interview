import axios from "axios";

const baseUrl = `https://localhost:5001`

export default axios.create({
  baseURL: baseUrl,
})