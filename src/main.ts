import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { EnvConfigModel } from './infrastructure/env';

function setUpSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token'
    )
    .setTitle('Avans Keuze Kompas API')
    .setDescription('The Avans Keuze Kompas API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
function setUpAppConfiguration(app: INestApplication, configService: ConfigService,
): void {
  app.enableCors({
    origin: [
      'https://localhost:5173',
      configService.get<string>('WEBAPP_BASE_URL_PROD'),
      configService.get<string>('AI_BASE_URL_PROD'),
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.useGlobalFilters();
  // app.useGlobalPipes(new ValidationPipe({}));
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvConfigModel>);
  const configServices = app.get(ConfigService);
  //setUpSwagger(app);
  setUpAppConfiguration(app, configServices);

  const port = configService.get('listeningPort');
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});