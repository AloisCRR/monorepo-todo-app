import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
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
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(
          process.cwd(),
          'libs/todo-api-interfaces/src/lib/todo-api-interfaces.ts'
        ),
        emitTypenameField: true,
        outputAs: 'class'
      }
    }),
    AuthModule
  ]
})
export class AppModule {}
