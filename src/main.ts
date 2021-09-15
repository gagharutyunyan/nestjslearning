import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as config from 'config';

(async () => {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (errors) =>
                new BadRequestException({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: errors.reduce((result, error) => {
                        result[error.property] = Object.values(error.constraints);
                        return result;
                    }, {}),
                }),
        }),
    );
    const serverConfig = config.get('server');
    await app.listen(serverConfig.port);
})();
