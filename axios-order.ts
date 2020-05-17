import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://e-papi-api.herokuapp.com',
});

export default instance;
