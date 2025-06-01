# Job Services

A TypeScript-based Node.js microservice for managing job-related operations using Express, Prisma, and PostgreSQL.

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL (if running locally)
- Redis (optional, for caching)

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 3000)
- `REDIS_URL`: Redis connection string (optional)

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

The easiest way to run the application with all dependencies:

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f job-service

# Stop services
docker-compose down
```

This will start:
- Job service on port 3000
- PostgreSQL database on port 5432
- Redis on port 6379

### Using Docker only

```bash
# Build the image
docker build -t job-services .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e PORT=3000 \
  job-services
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Set up database
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Database Management

```bash
# Run database migrations
npx prisma migrate dev

# Reset database (development only)
npx prisma migrate reset

# View data in Prisma Studio
npx prisma studio
```

## 🏗️ Project Structure

```
src/
├── index.ts              # Application entry point
├── config/              # Configuration files
├── controllers/         # Request handlers
├── routes/             # API routes
├── services/           # Business logic
├── types/              # TypeScript type definitions
└── generated/          # Generated Prisma client
```

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio for database management

## 🔧 API Endpoints

The service exposes REST API endpoints under `/jobs` prefix:

- Users: `/jobs/users`
- Products: `/jobs/products`
- Orders: `/jobs/orders`
- Brands: `/jobs/brands`
- Categories: `/jobs/categories`
- Admin: `/jobs/admin`

## 🏥 Health Check

The Docker container includes a health check endpoint. The application responds to health checks on the root path `/`.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request