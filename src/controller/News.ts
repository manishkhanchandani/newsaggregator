import pool from '../db/mysqlpool';
import moment from 'moment';

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


author
: 
"Max Zahn"
content
: 
"The stock market has climbed over the course of the presidential campaign, raising questions about whether the rally will continue depending upon which candidate wins: Vice President Kamala Harris or… [+4537 chars]"
description
: 
"The stock market has soared during the presidential campaign. Will it continue?"
publishedAt
: 
"2024-10-22T20:27:01Z"
source
: 
{id: "abc-news", name: "ABC News"}
id
: 
"abc-news"
name
: 
"ABC News"
title
: 
"What would a Kamala Harris or Donald Trump victory mean for the stock market?"
url
: 
"https://abcnews.go.com/Business/kamala-harris-donald-trump-victory-stock-market/story?id=115018990"
urlToImage
: 
"https://i.abcnewsfe.com/a/4d1079f3-ace7-4d1b-8000-393a5f8233b5/kamala-trump-election-gty-lv-241022_1729621193640_hpMain_16x9.jpg?w=1600"
 */

export const createNews = async (body: CreateNewsType) => {
  try {
    console.log('body: ', body);
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

    console.log('rows: ', rows);
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

      console.log('Insert Result:', result);
    }
  } catch (error) {
    console.error('Error querying the database:', error);
  }
};
