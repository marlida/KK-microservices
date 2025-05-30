import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { glob } from 'glob';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Job service is running');
});

const routeFiles = glob.sync('./src/routes/**/*.ts');
routeFiles.forEach(async (file) => {
  const route = await import(path.resolve(file));
  app.use('/api', route.default);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
