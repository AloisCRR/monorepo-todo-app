import type {
  AuthenticatedUser,
  DeleteAndUpdateResponse,
  DeleteTodo,
  ToDo,
  UpdateTodo
} from '@monorepo-todo-app/todo-api-interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Prisma } from '@prisma/client';
import PrismaService from '../prisma.service';

@Injectable()
export default class ToDoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async getAllToDosFromUser(data: AuthenticatedUser): Promise<ToDo[]> {
    let userId: string;

    try {
      const { id } = this.jwtService.verify<{ id: string }>(data.jwt);

      userId = id;
    } catch (error) {
      return [];
    }

    const result = await this.prisma.toDo.findMany({ where: { userId } });

    return result;
  }

  async addNewToDo(
    data: Prisma.ToDoCreateWithoutUserInput,
    user: AuthenticatedUser
  ): Promise<ToDo | null> {
    let userId: string;

    try {
      const { id } = this.jwtService.verify<{ id: string }>(user.jwt);

      userId = id;
    } catch (error) {
      return null;
    }

    return await this.prisma.toDo.create({
      data: {
        description: data.description,
        title: data.title,
        user: { connect: { id: userId } }
      }
    });
  }

  async deleteToDo(
    data: DeleteTodo,
    user: AuthenticatedUser
  ): Promise<DeleteAndUpdateResponse> {
    let userId: string;

    try {
      const { id } = this.jwtService.verify<{ id: string }>(user.jwt);

      userId = id;
    } catch (error) {
      return {
        error: (error as Error).message
      };
    }

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
    user: AuthenticatedUser
  ): Promise<DeleteAndUpdateResponse> {
    let userId: string;

    try {
      const { id } = this.jwtService.verify<{ id: string }>(user.jwt);

      userId = id;
    } catch (error) {
      return {
        error: (error as Error).message
      };
    }

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
