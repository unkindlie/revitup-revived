import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { RolesGuard } from 'features/auth/guards/roles.guard';
import { UserRole } from 'features/user/enums/user-role.enum';

export const Roles = (roles: UserRole[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
