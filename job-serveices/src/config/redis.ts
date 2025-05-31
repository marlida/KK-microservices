import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    connectTimeout: 10000,
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        return new Error('Max retries reached');
      }
      return Math.min(retries * 1000, 5000);
    },
  },
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

(async () => {
  await redisClient.connect();
})();

export default redisClient;


export const clearAllCache = async () => {
  try {
    await redisClient.flushDb();
    console.log('All cache cleared successfully');
  } catch (error) {
    console.error("Error clearing all Redis cache:", error);
  }
}


export const clearRelatedProductCache = async () => {
  try {
    const patterns = [
      "brand:*",
      "brands:*", 
      "product:*",
      "products:*",
      "category:*",
      "categories:*"
    ];

    for (const pattern of patterns) {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
        console.log(`Cleared ${keys.length} cache keys for pattern: ${pattern}`);
      }
    }
    
    console.log('All related product cache cleared successfully');
  } catch (error) {
    console.error("Error clearing related product cache:", error);
  }
}