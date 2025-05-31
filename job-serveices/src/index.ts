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
console.log('Found route files:', routeFiles);

routeFiles.forEach(async (file) => {
  try {
    const route = await import(path.resolve(file));
    app.use('/api', route.default);
    console.log('Route loaded successfully:', file);
  } catch (error) {
    console.error('Error loading route:', file, error);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
