import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import type { FastifyRequest } from 'fastify';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ToDoModule } from './to-do/to-do.module';

@Module({
  imports: [
    ToDoModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: false,
      ide: false,
      path: '/graphql',
      typePaths: [`${join(process.cwd(), 'graphql')}/**/*.graphql`],
      context: (request: FastifyRequest) => ({
        raw: request.raw
      })
    }),
    AuthModule
  ]
})
export class AppModule {}
