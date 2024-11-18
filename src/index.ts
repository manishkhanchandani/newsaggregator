import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import CustomError from '@utils/CustomError';

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

// Example Route with a Standard Error
app.get('/api/error', (req: Request, res: Response, next: NextFunction) => {
  throw new CustomError('This is a standard error', 400);
});

// Example Route with Async Error
app.get(
  '/api/async-error',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = null; // Simulate async error
      if (!data) {
        throw new CustomError('Data not found', 404);
      }
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
);

// // Error handling middleware
// app.use((err: unknown, req: Request, res: Response) => {
//   let message = '';
//   if (typeof err === 'string') {
//     console.error('Error querying the database:', err);
//     message = err;
//   } else if (err instanceof Error) {
//     console.error('Error querying the database:', err.message);
//     message = err.message;
//   }
//   res.statusCode = 500;
//   res.send({ success: false, message });
// });

// // Error-Handling Middleware
// app.use((err: unknown, req: Request, res: Response, next: any) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';

//   res.status(statusCode).json({
//     success: false,
//     error: message
//   });
// });

app.get('/test', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const Newsroutes = require('./routes/News.routes');
app.use('/news', Newsroutes);

// Error-Handling Middleware
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log('here');
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message
  });
});

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
