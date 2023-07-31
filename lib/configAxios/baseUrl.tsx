import Axios from 'axios';
const baseUrl = 'https://backend-aicu.vercel.app';
const axios = Axios.create({
  baseURL: baseUrl,
});
export default axios;