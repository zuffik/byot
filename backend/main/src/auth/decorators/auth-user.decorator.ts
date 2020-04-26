import { createParamDecorator } from '@nestjs/common';
import { User } from '../../user/user.entity';

export const AuthUser = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return User.findOne({ where: { id: ctx.req.user.id } });
  },
);
