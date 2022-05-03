import type {
  AddNewToDo,
  AuthenticatedUser,
  ToDo
} from '@monorepo-todo-app/todo-api-interfaces';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ToDoService from './to-do.service';

@Resolver('ToDo')
export class ToDoResolver {
  constructor(private readonly toDoService: ToDoService) {}

  @Query()
  async getAllTodosFromUser(
    @Args('data') data: AuthenticatedUser
  ): Promise<ToDo[]> {
    return this.toDoService.getAllTodosFromUser(data);
  }

  @Mutation()
  async addNewToDo(
    @Args('data') data: AddNewToDo,
    @Args('user') user: AuthenticatedUser
  ) {
    return await this.toDoService.addNewTodo(data, user);
  }
}
