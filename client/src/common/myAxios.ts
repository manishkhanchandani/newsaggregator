import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'https://newsapi.org',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': 'b55b26bd9f324b13aa6ec9897cf3ba6c'
  }
});

export default myAxios;
