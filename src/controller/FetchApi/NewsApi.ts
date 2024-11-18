import axios from 'axios';
import crypto from 'crypto';
import { createNews } from '../News';

function hashUrl(url: string) {
  return crypto.createHash('sha256').update(url).digest('hex'); // SHA-256 hash
}

const newsApiUrls = ['/v2/top-headlines?country=us'];

export const getNewsUrl = (q: string): string => {
  return `/v2/everything?q=${encodeURIComponent(q)}`;
};

const myAxios = axios.create({
  baseURL: 'https://newsapi.org',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': process.env.NEWS_API_KEY
  }
});

export default myAxios;

export const fetchNews = async (url: string) => {
  const response = await myAxios.get(url);
  return response.data;
};

export const processNews = async (url: string) => {
  const results = await fetchNews(url);
  for (let item of results?.articles) {
    const obj = {
      province: '',
      topic: '',
      title: item.title,
      description: item.description,
      url: item.url,
      author: item.author,
      content: item.content,
      publishedAt: item.publishedAt,
      urlToImage: item.urlToImage,
      reference: 'newsApi',
      source: item.source?.id,
      objectId: hashUrl(item.url)
    };
    await createNews(obj);
  }
};

export const fetchNewsApi = async () => {
  for (let url of newsApiUrls) {
    console.log('url is ', url);
    await processNews(url);
  }
};
