import { Module } from '@nestjs/common';
import { ToDoResolver } from './to-do.resolver';
import { ToDoService } from './to-do.service';

@Module({
  providers: [ToDoResolver, ToDoService]
})
export class ToDoModule {}
