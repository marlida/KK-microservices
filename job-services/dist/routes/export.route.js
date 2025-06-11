"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_export_1 = require("../utils/export/products.export");
const orders_export_1 = require("../utils/export/orders.export");
// import { exportUsers } from '../utils/export/users.export.js';
// import { exportAdmins } from '../utils/export/admins.export.js';
const router = express_1.default.Router();
router.get('/export/products', (req, res) => (0, products_export_1.exportProducts)(res));
router.get('/export/orders', (req, res) => (0, orders_export_1.exportOrders)(res));
// router.get('/export/users', (req, res) => exportUsers(res));
// router.get('/export/admins', (req, res) => exportAdmins(res));
exports.default = router;
