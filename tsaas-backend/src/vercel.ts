import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import express from 'express';

// Create a single Express instance to be reused across invocations
const server = express();
let isInitialized = false;

async function bootstrap(): Promise<void> {
  if (isInitialized) return;
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), { cors: true });

  // Logger via Winston
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

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
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.init();
  isInitialized = true;
}

// Initialize immediately (cold start)
void bootstrap();

// Export the Express handler for Vercel Serverless Functions
export default server;
