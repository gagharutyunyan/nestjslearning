import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import typeormConfig from './config/typeorm.config';

@Module({
    imports: [TypeOrmModule.forRoot(typeormConfig), TasksModule, AuthModule],
})
export class AppModule {}
