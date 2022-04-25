import { Query, Resolver } from '@nestjs/graphql';
import ToDoService from './to-do.service';

@Resolver('ToDo')
export class ToDoResolver {
  constructor(private readonly toDoService: ToDoService) {}

  @Query('todos')
  getAllTodos() {
    return this.toDoService.getAllTodos();
  }
}
