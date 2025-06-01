import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import all routes explicitly
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import orderRoutes from './routes/order.route';
import categoryRoutes from './routes/category.route';
import brandRoutes from './routes/brand.route';
import adminRoutes from './routes/admin.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Job service is running');
});

// Register routes
app.use('/jobs', userRoutes);
app.use('/jobs', productRoutes);
app.use('/jobs', orderRoutes);
app.use('/jobs', categoryRoutes);
app.use('/jobs', brandRoutes);
app.use('/jobs', adminRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
