import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { EnvConfigModel } from './infrastructure/env';

function setUpSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Avans Keuze Kompas API')
    .setDescription('The Avans Keuze Kompas API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
function setUpAppConfiguration(app: INestApplication): void {
  app.enableCors();
  app.useGlobalFilters();
  // app.useGlobalPipes(new ValidationPipe({}));
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvConfigModel>);
  setUpSwagger(app);
  setUpAppConfiguration(app);

  const port = configService.get('listeningPort');
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});