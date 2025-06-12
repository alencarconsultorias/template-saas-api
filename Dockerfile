# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY tsaas-backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code and configuration files
COPY tsaas-backend/ ./

# Generate Prisma client and build the application
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY tsaas-backend/package*.json ./
RUN npm ci --production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Copy generated Prisma client
COPY --from=builder /app/generated/prisma ./generated/prisma

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy configuration files
COPY tsaas-backend/tsconfig*.json ./
COPY tsaas-backend/nest-cli.json ./

# Copy environment files
COPY tsaas-backend/.env.aws ./
COPY tsaas-backend/.env.localhost.dev ./

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "start:aws"]
