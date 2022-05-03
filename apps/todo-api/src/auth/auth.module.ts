import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import PrismaService from '../prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register({ secret: process.env['JWT_SECRET'] })],
  providers: [AuthResolver, AuthService, PrismaService]
})
export class AuthModule {}
