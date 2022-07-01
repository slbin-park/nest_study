import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 클래스 벨리데이션 사용하려면 이걸 해야함
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // 폴더에 url로 바로 접근가능하게 하는거
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  const PORT = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: true, // 원래는 주소를 적어야함
    credentials: true,
  });
  await app.listen(PORT);
}
bootstrap();
