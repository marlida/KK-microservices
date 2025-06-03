import express from 'express';
import { exportProducts } from '../utils/export/products.export';
import { exportOrders } from '../utils/export/orders.export';
// import { exportUsers } from '../utils/export/users.export.js';
// import { exportAdmins } from '../utils/export/admins.export.js';

const router = express.Router();

router.get('/export/products', (req, res) => exportProducts(res));
router.get('/export/orders', (req, res) => exportOrders(res));
// router.get('/export/users', (req, res) => exportUsers(res));
// router.get('/export/admins', (req, res) => exportAdmins(res));

export default router;