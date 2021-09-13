import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

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
    await app.listen(5000);
})();
