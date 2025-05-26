import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //await app.listen(process.env.PORT ?? 3000);

  // Swagger creation API 
  const config = new DocumentBuilder()
    .setTitle('TSAAS API')
    .setDescription('API for TSaaS')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //await app.listen(3000);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
