import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

const globalApiPrefix = '/api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalApiPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap().then(() => console.log('server started'));
