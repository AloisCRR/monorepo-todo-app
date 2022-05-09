import type {
  AuthenticatedUser,
  DeleteTodo,
  NewToDo,
  ToDo,
  UpdateTodo
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
    return this.toDoService.getAllToDosFromUser(data);
  }

  @Mutation()
  async addNewToDo(
    @Args('data') data: NewToDo,
    @Args('user') user: AuthenticatedUser
  ) {
    return await this.toDoService.addNewToDo(data, user);
  }

  @Mutation()
  async deleteToDo(
    @Args('data') data: DeleteTodo,
    @Args('user') user: AuthenticatedUser
  ) {
    return await this.toDoService.deleteToDo(data, user);
  }

  @Mutation()
  async updateToDo(
    @Args('data') data: UpdateTodo,
    @Args('user') user: AuthenticatedUser
  ) {
    return await this.toDoService.updateToDo(data, user);
  }
}
