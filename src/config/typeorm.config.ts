import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'db',
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    // cli: {
    //     migrationsDir: 'src/migrations',
    // },
};

export default typeormConfig;
