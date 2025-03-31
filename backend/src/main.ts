import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from your frontend
  app.enableCors({
    origin: true, // This allows any origin in development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // // Add a global validation pipe to enforce DTO validations
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // Strips properties that aren't in the DTO
  //     forbidNonWhitelisted: true, // Throws an error for non-whitelisted properties
  //     transform: true, // Automatically transforms payloads to be objects typed according to their DTO classes
  //   }),
  // );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
