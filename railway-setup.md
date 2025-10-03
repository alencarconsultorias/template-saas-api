# Railway Setup Guide

## Deploy Configuration

### 1. Environment Variables
Configure these variables in Railway dashboard:

```env
DATABASE_URL=postgresql://your-railway-db-url
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
NODE_ENV=production
PORT=3000
```

### 2. Railway Configuration
- Railway will automatically detect the `railway.toml` configuration
- The `Dockerfile.railway` will be used for deployment
- Health check is configured at root path `/`

### 3. Database Setup
- Railway PostgreSQL service will automatically provide `DATABASE_URL`
- Migrations will run automatically during deployment
- Prisma client will be generated during build

### 4. Build Process
1. Railway clones repository
2. Builds using `Dockerfile.railway`
3. Runs Prisma migrations
4. Generates Prisma client
5. Starts application

### 5. Access URLs
- Application: `https://your-app.railway.app`
- API Documentation: `https://your-app. Railway.app/api-docs`

## Local Development with Railway Database

To test locally with Railway database:
```bash
npm run start:dev:railway
```

## Production Deployment
```bash
# Push to Railway through Git
git push railway main
```
