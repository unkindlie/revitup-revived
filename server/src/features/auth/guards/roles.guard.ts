import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UserPayloadDto } from 'features/auth/dto';
import { UserRole } from 'features/user/enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as UserPayloadDto;

    const userRoles = user.roles;
    const routeRoles: UserRole[] = this.reflector.get(
      'roles',
      context.getHandler(),
    );

    if (!routeRoles || routeRoles.length === 0) return true;

    return routeRoles.every((routeRole) => userRoles.includes(routeRole));
  }
}
