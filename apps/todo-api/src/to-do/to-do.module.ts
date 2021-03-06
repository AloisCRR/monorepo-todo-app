import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import PrismaService from '../prisma.service';
import { ToDoResolver } from './to-do.resolver';
import ToDoService from './to-do.service';

@Module({
  imports: [JwtModule.register({ secret: process.env['JWT_SECRET'] })],
  providers: [ToDoResolver, ToDoService, PrismaService]
})
export class ToDoModule {}
