import type {
  AuthenticatedUser,
  ToDo
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

  async getAllTodosFromUser(data: AuthenticatedUser): Promise<ToDo[]> {
    const { id } = this.jwtService.verify<{ id: string }>(data.jwt);

    const result = await this.prisma.toDo.findMany({ where: { userId: id } });

    return result;
  }

  async addNewTodo(
    data: Prisma.ToDoCreateWithoutUserInput,
    user: AuthenticatedUser
  ): Promise<ToDo> {
    const { id } = this.jwtService.verify<{ id: string }>(user.jwt);

    return await this.prisma.toDo.create({
      data: {
        description: data.description,
        title: data.title,
        user: { connect: { id } }
      }
    });
  }
}
