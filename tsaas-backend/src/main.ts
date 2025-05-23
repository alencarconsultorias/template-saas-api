import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeFirebase } from './config/firebase.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Inicializa o Firebase Admin SDK
  initializeFirebase();
  
  // Habilita CORS
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
