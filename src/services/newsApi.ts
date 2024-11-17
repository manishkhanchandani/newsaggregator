import axios from 'axios';

console.log('NEWS_API_KEY: ', process.env.NEWS_API_KEY);
/* `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    q
  )}&page=${page}`
*/
export const fetchNewsApi = async (url: string) => {
  const response = await axios({
    url,
    method: 'get',
    headers: {
      'X-Api-Key': 'b55b26bd9f324b13aa6ec9897cf3ba6c',
      'Content-Type': 'application/json'
    }
  });
  console.log('response: ', response);
  return response.data;
};

export const insertIntoDb = ({}) => {};
