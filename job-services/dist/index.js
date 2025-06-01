"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// Import all routes explicitly
const user_route_1 = __importDefault(require("./routes/user.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const brand_route_1 = __importDefault(require("./routes/brand.route"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Job service is running');
});
// Register routes
app.use('/jobs', user_route_1.default);
app.use('/jobs', product_route_1.default);
app.use('/jobs', order_route_1.default);
app.use('/jobs', category_route_1.default);
app.use('/jobs', brand_route_1.default);
app.use('/jobs', admin_route_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
