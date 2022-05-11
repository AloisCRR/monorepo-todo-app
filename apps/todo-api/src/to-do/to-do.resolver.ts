import type {
  DeleteTodo,
  NewToDo,
  UpdateTodo,
  UpdateTodoState
} from '@monorepo-todo-app/todo-api-interfaces';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { ToDo } from '@prisma/client';
import { CurrentUser } from '../decorators/current-user';
import JwtGuard from '../guards/jwt-guard';
import ToDoService from './to-do.service';

@Resolver('ToDo')
@UseGuards(JwtGuard)
export class ToDoResolver {
  constructor(private readonly toDoService: ToDoService) {}

  @Query()
  async getAllTodosFromUser(@CurrentUser() userId: string): Promise<ToDo[]> {
    return this.toDoService.getAllToDosFromUser(userId);
  }

  @Mutation()
  @UseGuards(JwtGuard)
  async addNewToDo(@Args('data') data: NewToDo, @CurrentUser() userId: string) {
    return await this.toDoService.addNewToDo(data, userId);
  }

  @Mutation()
  async deleteToDo(
    @Args('data') data: DeleteTodo,
    @CurrentUser() userId: string
  ) {
    return await this.toDoService.deleteToDo(data, userId);
  }

  @Mutation()
  async updateToDo(
    @Args('data') data: UpdateTodo,
    @CurrentUser() userId: string
  ) {
    return await this.toDoService.updateToDo(data, userId);
  }

  @Mutation()
  async updateToDoState(
    @Args('data') data: UpdateTodoState,
    @CurrentUser() userId: string
  ) {
    return await this.toDoService.updateTodoState(data, userId);
  }
}
