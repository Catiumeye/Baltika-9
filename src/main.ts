import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.APP_PORT;
  const host = process.env.APP_HOST;

  await app.listen(port, host, () => {
    Logger.log(`Server started ass ♂${host}:${port}♂`)
  });
}
bootstrap();
