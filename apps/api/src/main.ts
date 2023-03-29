import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exceptionFactory } from '@app/common/utils/error-formatter.util';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory,
        })
    );

    const port = configService.get('APP_PORT', 8080);
    const host = configService.get('APP_HOST', '127.0.0.1');;

    await app.listen(
        port, 
        host, 
        () => {
      Logger.log(`Server started ass ♂${host}:${port}♂`)
    });
}
bootstrap();
