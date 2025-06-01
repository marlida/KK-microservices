"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearRelatedProductCache = exports.clearAllCache = void 0;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});
// Connect to Redis
redisClient.connect().catch(console.error);
exports.default = redisClient;
const clearAllCache = async () => {
    try {
        await redisClient.flushDb();
        console.log('All cache cleared successfully');
    }
    catch (error) {
        console.error("Error clearing all Redis cache:", error);
    }
};
exports.clearAllCache = clearAllCache;
const clearRelatedProductCache = async () => {
    try {
        const patterns = [
            "brand:*",
            "brands:*",
            "product:*",
            "products:*",
            "category:*",
            "categories:*",
            "order:*",
            "orders:*",
        ];
        for (const pattern of patterns) {
            const keys = await redisClient.keys(pattern);
            if (keys.length > 0) {
                await redisClient.del(keys);
                console.log(`Cleared ${keys.length} cache keys for pattern: ${pattern}`);
            }
        }
        console.log('All related product cache cleared successfully');
    }
    catch (error) {
        console.error("Error clearing related product cache:", error);
    }
};
exports.clearRelatedProductCache = clearRelatedProductCache;
