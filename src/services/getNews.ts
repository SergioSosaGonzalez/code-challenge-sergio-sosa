import { News } from '../interfaces/news';

const NEWS_API = 'https://newsapi.org/v2/top-headlines';
const API_KEY = import.meta.env.VITE_API_NEWS_KEY;

export const getNewsAPI = async (ln: string = 'us'): Promise<News> => {
  const countreNews = ln === 'es' ? 'mx' : 'us';
  const request = await fetch(
    `${NEWS_API}?country=${countreNews}&apiKey=${API_KEY}`
  );
  const response = (await request.json()) as Promise<News>;
  return response;
};
