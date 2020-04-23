import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/user.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return User.findOne({where: {id: ctx.getContext().req.user?.id}});
  },
);
