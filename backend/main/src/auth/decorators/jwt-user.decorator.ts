import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../../graphql/ts/types';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface JwtUserType {
  id: string;
  email: string;
  role: Role;
}

export const JwtUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
