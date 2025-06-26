import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , {cors: true});
  
  // Get the Winston logger
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // Set global prefix for the API
  // app.setGlobalPrefix('api');

  // Swagger creation API 
  const config = new DocumentBuilder()
    .setTitle('TSAAS API')
    .setDescription('API for TSaaS')
    .setVersion('1.0')
    .addBearerAuth(
      {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'},
      'accessToken',
    )
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  //await app.listen(3000);
  // "0.0.0.0" is used to listen on all interfaces
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
  logger.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`, 'Bootstrap');
  logger.log(`Swagger running on http://localhost:${process.env.PORT ?? 3000}/api-docs`, 'Bootstrap');
}

bootstrap();
