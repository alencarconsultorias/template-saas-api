import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { INestApplication } from '@nestjs/common';
import * as express from 'express';
import { Request, Response } from 'express';

// Create a single Express instance to be reused across invocations
const server = express();
let app: INestApplication | null = null;
let isInitialized = false;
let initPromise: Promise<void> | null = null;

async function bootstrap(): Promise<void> {
  if (isInitialized) return;
  
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(server), { 
    cors: true,
    logger: false, // Disable default logger, we'll use Winston
  });

  // Logger via Winston
  try {
    const logger = nestApp.get(WINSTON_MODULE_NEST_PROVIDER);
    nestApp.useLogger(logger);
  } catch (error) {
    // Logger might not be available, continue without it
    console.error('Failed to get Winston logger:', error);
  }

  // Swagger setup (mesmo path do main.ts)
  const config = new DocumentBuilder()
    .setTitle('TSAAS API')
    .setDescription('API for TSaaS')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('api-docs', nestApp, document);

  await nestApp.init();
  app = nestApp;
  isInitialized = true;
}

// Initialize on first request (lazy initialization)
function ensureInitialized(): Promise<void> {
  if (isInitialized) {
    return Promise.resolve();
  }
  if (!initPromise) {
    initPromise = bootstrap();
  }
  return initPromise;
}

// Export the Express handler for Vercel Serverless Functions
export default async function handler(req: Request, res: Response): Promise<void> {
  try {
    await ensureInitialized();
    
    if (!app) {
      throw new Error('NestJS application not initialized');
    }

    // Get the Express instance from NestJS HTTP adapter
    // This is the properly configured Express app that NestJS has set up
    const expressApp = app.getHttpAdapter().getInstance();
    
    // Handle the request using the NestJS-configured Express instance
    expressApp(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
