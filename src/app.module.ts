import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { appConfig, databaseConfig, DatabaseConfig } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { types } from 'pg';
import { ClsModule } from 'nestjs-cls';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV !== 'local',
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        const dbConfig = configService.get<DatabaseConfig>('database');
        const options: PostgresConnectionOptions = {
          ...dbConfig,
          synchronize: false,
          migrationsRun: false,
          entities: [join(__dirname, '**/*.entity.{ts,js}')],
        };
        types.setTypeParser(types.builtins.INT8, (value) => {
          return value === null ? null : BigInt(value).toString();
        });
        return options;
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
