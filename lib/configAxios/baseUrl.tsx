import Axios from 'axios';
const baseUrl = 'http://ai-cu.paxrelpax.com';
const axios = Axios.create({
  baseURL: baseUrl,
});
export default axios;