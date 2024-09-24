import axios from "axios";
import { BASE_URL } from "../utils/config";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
