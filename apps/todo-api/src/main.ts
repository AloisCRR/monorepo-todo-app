import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication
} from '@nestjs/platform-fastify';
import AltairFastify from 'altair-fastify-plugin';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors();

  if (String(process.env['NODE_ENV']) !== 'production') {
    // @ts-expect-error Incompatible interfaces between @nestjs/platform-fastify and fastify
    await app.register(AltairFastify, {
      path: '/altair',
      baseURL: '/altair/',
      endpointURL: '/graphql'
    });
  }

  await app.listen(process.env['PORT'] || 3333, '0.0.0.0');
}

void bootstrap();
