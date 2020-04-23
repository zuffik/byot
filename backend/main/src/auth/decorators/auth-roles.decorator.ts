import { Role } from '../../graphql/ts/types';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthRolesGuard } from '../jwt/auth-roles.guard';

export const AuthRolesMetaDataKey = 'AuthRoles';

export const AuthRoles = (...roles: Role[]) => applyDecorators(
  SetMetadata(AuthRolesMetaDataKey, roles),
  UseGuards(AuthRolesGuard)
);
