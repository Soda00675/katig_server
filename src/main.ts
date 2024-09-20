import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';

import { GlobalExceptionFilter } from '@/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Global configuration
   */
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  });
  app.use(helmet({ contentSecurityPolicy: true }));
  app.use(compression());

  /**
   * Global filters
   */
  app.useGlobalFilters(new GlobalExceptionFilter());

  /**
   * Swagger config
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Automatically generated API documentation')
    .setVersion('1.0')
    .setExternalDoc(
      'Export API documentation as json file',
      'docs/api/download',
    )
    .addTag('Auth API', 'Auth account management')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs/api', app, swaggerDocument, {
    customSiteTitle: 'CUL Transport API Swagger Documentation',
  });

  /**
   * Run the application
   */
  await app.listen(process.env.APP_PORT, '0.0.0.0');
}
bootstrap();
