import express, { Request, Response } from 'express';
import cron from 'node-cron';
import {
  // fetchNews,
  // fetchNewsApi,
  getNewsUrl,
  processNews
} from '../controller/FetchApi/NewsApi';
import {
  createNews,
  getAllNews,
  GetAllNewsType,
  getSingleNews
} from '../controller/News';

const router = express.Router();

// http://localhost:4000/news?state=x&topic=y&search=keyword&page=0&totalRows=0
router.get('/', async (req: Request, res: Response) => {
  const searchParams = req.query;
  const params: GetAllNewsType = {
    province: (searchParams.province as string) ?? '',
    topic: (searchParams.topic as string) ?? '',
    search: (searchParams.search as string) ?? '',
    max: (searchParams.max as string) ?? '10',
    totalRows: searchParams.totalRows as string,
    page: searchParams.page as string
  };

  if (searchParams.search) {
    const url = getNewsUrl(searchParams.search as string);
    await processNews(url);
  }

  const results = await getAllNews(params);
  res.send({
    success: true,
    results
  });
});

// http://localhost:4000/news/1
router.get('/:id', async (req: Request, res: Response) => {
  const params = req.params;
  console.log('params: ', params);
  const id = params?.id ? parseInt(params?.id, 10) : 0;
  let result = {};
  if (id) {
    result = await getSingleNews(id);
  } else {
    result = { success: false, message: 'No ID provided.' };
  }
  res.send(result);
});

// http://localhost:4000/news
router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  await createNews(body);
  res.send({
    success: true,
    body
  });
});

/**
 *  
  * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | month
  | | | day of month
  | | hour
  | minute
  second ( optional )
 */
cron.schedule('0 0 * * * *', async () => {
  console.log('fetching news at particular time defined');
  // await fetchNewsApi();
});

module.exports = router;
