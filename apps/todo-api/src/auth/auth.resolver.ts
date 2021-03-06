import type { UserRegister } from '@monorepo-todo-app/todo-api-interfaces';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async register(@Args('data') data: UserRegister) {
    return await this.authService.createUser(data);
  }

  @Mutation()
  async login(@Args('data') data: UserRegister) {
    return await this.authService.loginUser(data);
  }
}
