import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const configEnv = app.get(ConfigService);

	const port = +configEnv.get('API_PORT') || 3000;

	const configSwagger = new DocumentBuilder().setTitle('Base blog').setVersion('1.0').build();
	const document = SwaggerModule.createDocument(app, configSwagger);
	SwaggerModule.setup('api', app, document);

	await app.listen(port);
	Logger.log(`Server is running on port ${port}`, 'Boostrap');
	Logger.log(`Swagger at http://localhost:${port}/api`, 'Swagger');
}

bootstrap();
