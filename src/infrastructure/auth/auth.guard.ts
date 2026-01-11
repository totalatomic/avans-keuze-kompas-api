import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { AuthInjectionToken } from "./auth.injection.token";
import { IAuthInterface } from '../../domain/interfaces';
import { AuthService } from '../auth/auth.service';

export class Authguard implements CanActivate {
  constructor(
    @Inject(AuthInjectionToken)
    private authservice: AuthService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}