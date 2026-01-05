import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Avans Keuze Kompas API')
    .setDescription('The Avans Keuze Kompas API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();