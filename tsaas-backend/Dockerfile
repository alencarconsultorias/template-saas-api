# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with clean cache
RUN npm ci --only=production --silent && npm cache clean --force

# Copy source code and configuration files
COPY . ./

# Generate Prisma client and build the application
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache dumb-init

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production --silent && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Copy generated Prisma client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Install Prisma CLI in the runtime image for migrations
RUN npm install --no-save prisma@^6.11.1 --silent

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose default port (Railway sets PORT automatically)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Health check uses PORT if provided
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const port=process.env.PORT||3000;require('http').get(`http://localhost:${port}/health`, (res)=>process.exit(res.statusCode===200?0:1)).on('error',()=>process.exit(1))"

# Start the application with dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start:railway"]
