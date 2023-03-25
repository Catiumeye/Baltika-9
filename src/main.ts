import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exceptionFactory } from 'common/utils/error-formatter.util';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory,
        })
    );

    const port = process.env.APP_PORT;
    const host = process.env.APP_HOST;

    await app.listen(port, host, () => {
      Logger.log(`Server started ass ♂${host}:${port}♂`)
    });
}
bootstrap();
