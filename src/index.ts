import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config({
  path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`)
});

const app: Express = express();
const port = process.env.PORT ?? 4000;

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const Newsroutes = require('./routes/News.routes');
app.use('/news', Newsroutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
