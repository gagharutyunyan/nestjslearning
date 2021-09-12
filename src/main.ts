import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            exceptionFactory: (errors) =>
                new BadRequestException(
                    errors.map(({ property, value, constraints }) => ({
                        property,
                        value,
                        constraints,
                    })),
                ),
        }),
    );
    await app.listen(5000);
}
bootstrap();
