import express, { Request, Response } from 'express';
import cron from 'node-cron';
import pool from '../db/mysqlpool';
import { createNews } from 'src/controller/News';

const router = express.Router();

// http://localhost:4000/news?state=x&topic=y&search=keyword
router.get('/', async (req: Request, res: Response) => {
  const searchParams = req.query;
  console.log('searchParams: ', searchParams);
  res.send({
    success: true,
    searchParams
  });
});

// http://localhost:4000/news/1
router.get('/:id', async (req: Request, res: Response) => {
  const params = req.params;
  console.log('params: ', params);
  res.send({
    success: true,
    params
  });
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
cron.schedule('0 * * * * *', async () => {
  console.log('fetching news at particular time defined');
});

module.exports = router;
