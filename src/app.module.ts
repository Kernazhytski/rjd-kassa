import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { appConfig, databaseConfig, DatabaseConfig } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { types } from 'pg';
import { ClsModule } from 'nestjs-cls';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { UserToRoleModule } from './core/user_to_role/user_to_role.module';
import { TrainModule } from './core/train/train.module';
import { TrainTypeModule } from './core/nsi/train-type/train-type.module';
import { RouteModule } from './core/route/route.module';
import { VoyageModule } from './core/voyage/voyage.module';
import { TicketModule } from './core/ticket/ticket.module';

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
    UserModule,
    UserToRoleModule,
    TrainModule,
    TrainTypeModule,
    RouteModule,
    VoyageModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
