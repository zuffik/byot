import { createParamDecorator } from '@nestjs/common';
import { Role } from '../../graphql/ts/types';

export interface JwtUserType {
  id: string;
  email: string;
  role: Role;
}

export const JwtUser = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return ctx.req.user;
  },
);
