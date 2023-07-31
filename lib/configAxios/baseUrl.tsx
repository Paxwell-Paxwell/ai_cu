import Axios from 'axios';
const baseUrl = 'https://api.paxrelpax.com';
const axios = Axios.create({
  baseURL: baseUrl,
});
export default axios;