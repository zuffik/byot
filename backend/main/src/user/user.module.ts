import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { TokenService } from './token/token.service';
import { Token } from './token/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  providers: [UserResolver, UserService, TokenService],
  exports: [UserService, TokenService],
})
export class UserModule {}
