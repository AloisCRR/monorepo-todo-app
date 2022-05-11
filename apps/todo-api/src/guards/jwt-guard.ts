import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { StatusCodes } from 'http-status-codes';
import mercurius from 'mercurius';

@Injectable()
export default class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const graphqlContext = GqlExecutionContext.create(context);

    const { req } = graphqlContext.getContext<{ req: { userId: string } }>();

    const { data, user } = graphqlContext.getArgs<{
      data: {
        jwt?: string;
      };
      user: {
        jwt?: string;
      };
    }>();

    try {
      const { id } = this.jwtService.verify<{ id: string }>(
        data.jwt || user.jwt || ''
      );

      req.userId = id;
    } catch (error) {
      throw new mercurius.ErrorWithProps(
        'Token Error',
        {
          message: (error as Error).message
        },
        StatusCodes.FORBIDDEN
      );
    }

    return true;
  }
}
