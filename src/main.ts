import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from './pipes/validation.pipe';
import { ResponseFormatInterceptor } from './common/interceptor/response-format.interceptor';
import { AppExceptionFilter } from './common/filters/exception.filter';
import { AppConfig } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('0.0.1')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
  const configService = app.get(ConfigService);
  const cls = app.get(ClsService);

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ResponseFormatInterceptor(cls));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ allowedHeaders: '*', exposedHeaders: '*' });
  const appConfig = configService.get<AppConfig>('app');

  await app.listen(appConfig.apiPort ?? 3000);
}
bootstrap();
