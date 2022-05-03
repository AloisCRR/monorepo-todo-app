import type { AuthResponse } from '@monorepo-todo-app/todo-api-interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import PrismaService from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<AuthResponse> {
    const hashedPassword = await argon2.hash(data.password);

    const user = await this.prisma.user.create({
      data: { email: data.email, password: hashedPassword }
    });

    return { jwt: this.jwtService.sign({ id: user.id }) };
  }
}
