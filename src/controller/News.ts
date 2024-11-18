import pool from '../db/mysqlpool';
import moment from 'moment';

function formatQuery(sql: string, params: any[]): string {
  return sql.replace(/\?/g, () => {
    const value = params.shift();
    return typeof value === 'string'
      ? `'${value.replace(/'/g, "\\'")}'`
      : value;
  });
}

/**
{
    "province": "CA",
    "topic": "polictics",
    "title": "What would a Kamala Harris or Donald Trump victory mean for the stock market?",
    "description": "The stock market has soared during the presidential campaign. Will it continue?",
    "url": "https://abcnews.go.com/Business/kamala-harris-donald-trump-victory-stock-market/story?id=115018990",
    "urlToImage": "https://i.abcnewsfe.com/a/4d1079f3-ace7-4d1b-8000-393a5f8233b5/kamala-trump-election-gty-lv-241022_1729621193640_hpMain_16x9.jpg?w=1600",
    "author": "Max Zahn",
    "content": "The stock market has climbed over the course of the presidential campaign, raising questions about whether the rally will continue depending upon which candidate wins: Vice President Kamala Harris or… [+4537 chars]",
    "objectId": "2",
    "publishedAt": "2024-10-22T20:27:01Z",
    "reference": "manual",
    "source": "abc-news",
}


 */

type CreateNewsType = {
  province: string;
  topic: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author: string;
  content: string;
  publishedAt: string;
  reference: string;
  source: string;
  objectId: string;
};

export const createNews = async (body: CreateNewsType) => {
  try {
    const {
      province,
      topic,
      title,
      description,
      url,
      author,
      content,
      publishedAt,
      urlToImage,
      reference,
      source,
      objectId
    } = body;
    const [rows] = await pool.execute(
      'SELECT * FROM articles WHERE objectId = ?',
      [objectId]
    );

    if (Array.isArray(rows) && rows.length === 0) {
      // insert into db
      const [result] = await pool.execute(
        'INSERT INTO articles (province, topic, title, description, url, author, content, publishedAt, publishedAtTime, reference, urlToImage, source, createdAt, updatedAt, objectId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          province,
          topic,
          title,
          description,
          url,
          author,
          content,
          publishedAt,
          moment(publishedAt).unix(),
          reference,
          urlToImage,
          source,
          moment().toISOString(),
          moment().toISOString(),
          objectId
        ]
      );

      return result;
    }
  } catch (error: unknown) {
    if (typeof error === 'string') {
      console.error('Error querying the database:', error);
    } else if (error instanceof Error) {
      console.error('Error querying the database:', error.message);
    }
  }
};

export type GetAllNewsType = {
  province?: string;
  topic?: string;
  search?: string;
  max?: string;
  page?: string;
  totalRows?: string;
};

export const getAllNews = async (params: GetAllNewsType) => {
  try {
    const { province, topic, search, max, page, totalRows } = params;
    const newPage = page ? parseInt(page, 10) : 0;
    const newMax = max ? parseInt(max, 10) : 10;
    const totalRowsInt = totalRows ? parseInt(totalRows, 10) : 0;
    const start: number = newPage * newMax;

    const sql =
      'SELECT * FROM articles WHERE province LIKE ? and topic LIKE ? and (title LIKE ? OR description LIKE ?) and status = 1 LIMIT ? OFFSET ?';
    const reqParms = [
      `%${province}%`,
      `%${topic}%`,
      `%${search}%`,
      `%${search}%`,
      newMax,
      start
    ];

    console.log('Parsed Query:', formatQuery(sql, [...reqParms]));

    const [rows] = await pool.execute(sql, reqParms);

    const results = {
      totalRows: totalRowsInt,
      totalPages: 0,
      max: newMax,
      page: newPage,
      start,
      province,
      topic,
      search,
      rows
    };

    if (!totalRows) {
      let rows2;

      const sqlTotal =
        'SELECT count(*) as cnt FROM articles WHERE province LIKE ? and topic LIKE ? and (title LIKE ? OR description LIKE ?) and status = 1';
      const reqParms2 = [
        `%${province}%`,
        `%${topic}%`,
        `%${search}%`,
        `%${search}%`
      ];

      [rows2] = await pool.execute(sqlTotal, reqParms2);

      if (Array.isArray(rows2) && rows2.length > 0 && 'cnt' in rows2[0]) {
        results.totalRows = rows2[0].cnt;
      }
    }

    results.totalPages = Math.ceil(results.totalRows / newMax) - 1;
    return results;
  } catch (error: unknown) {
    console.log('error is ', error);
    if (typeof error === 'string') {
      console.error('Error querying the database:', error);
    } else if (error instanceof Error) {
      console.error('Error querying the database:', error.message);
    }
  }
};
