import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from '../../configs';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      /*global: true,
      signOptions: {
        algorithm: 'RS512',
      },
      publicKey: process.env.SERVER_JWT_PUBLIC_KEY,
      privateKey: process.env.SERVER_JWT_PRIVATE_KEY,*/
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        const appConfig = configService.get<AppConfig>('app');

        return {
          global: true,
          signOptions: {
            algorithm: 'RS512',
          },
          publicKey: appConfig.jwtPublicKey,
          privateKey: appConfig.jwtPrivateKey,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
