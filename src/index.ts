import express, { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config({
  path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`)
});

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

const app: Express = express();
const port = process.env.PORT ?? 4000;

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/test', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const Newsroutes = require('./routes/News.routes');
app.use('/news', Newsroutes);

if (process.env.NODE_ENV === 'production') {
  console.log(
    'setting path',
    path.resolve(__dirname, '..', 'client', 'build', 'index.html')
  );
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
