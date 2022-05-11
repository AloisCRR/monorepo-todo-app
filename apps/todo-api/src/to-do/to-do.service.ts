import type {
  DeleteAndUpdateResponse,
  DeleteTodo,
  NewToDo,
  UpdateTodo,
  UpdateTodoState
} from '@monorepo-todo-app/todo-api-interfaces';
import { Injectable } from '@nestjs/common';
import type { ToDo } from '@prisma/client';
import PrismaService from '../prisma.service';

@Injectable()
export default class ToDoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllToDosFromUser(userId: string): Promise<ToDo[]> {
    return this.prisma.toDo.findMany({ where: { userId } });
  }

  async addNewToDo(data: NewToDo, userId: string): Promise<ToDo | null> {
    return this.prisma.toDo.create({
      data: {
        description: data.description,
        title: data.title,
        state: data.state || undefined,
        user: { connect: { id: userId } }
      }
    });
  }

  async deleteToDo(
    data: DeleteTodo,
    userId: string
  ): Promise<DeleteAndUpdateResponse> {
    await this.prisma.toDo.delete({
      where: {
        id_userId: {
          id: data.id,
          userId
        }
      }
    });

    return {
      message: 'Success!'
    };
  }

  async updateToDo(
    data: UpdateTodo,
    userId: string
  ): Promise<DeleteAndUpdateResponse> {
    await this.prisma.toDo.update({
      data,
      where: {
        id_userId: { userId, id: data.id }
      }
    });

    return {
      message: 'Success!'
    };
  }

  async updateTodoState(
    data: UpdateTodoState,
    userId: string
  ): Promise<DeleteAndUpdateResponse> {
    await this.prisma.toDo.update({
      data,
      where: {
        id_userId: { userId, id: data.id }
      }
    });

    return {
      message: 'Success!'
    };
  }
}
