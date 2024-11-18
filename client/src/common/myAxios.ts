import axios from 'axios';

const myAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://parseserver.us:4001'
      : 'http://localhost:4000',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// const myAxios = axios.create({
//   baseURL: 'https://newsapi.org',
//   timeout: 60000,
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Api-Key': 'b55b26bd9f324b13aa6ec9897cf3ba6c'
//   }
// });

export default myAxios;
