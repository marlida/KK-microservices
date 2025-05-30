# 1. เลือก Node.js base image
FROM node:20

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy source code
COPY . .

# 5. Build TypeScript เป็น JavaScript
RUN npm run build

# 6. Expose port (เช่น 3000)
EXPOSE 3000

# 7. Start app จาก JavaScript ที่ build แล้ว
CMD ["node", "dist/index.js"]
