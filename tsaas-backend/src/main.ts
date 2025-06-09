import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , {cors: true});

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
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger running on http://localhost:${process.env.PORT ?? 3000}/api-docs`);
}

bootstrap();
