import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenfromRequest } from '../utils';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/domain/common/decorators/public.decorator';
@Injectable()
export class Authguard implements CanActivate {
  constructor(
    private Jwtservice: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    //check if the token is passed in the header
    const request = context.switchToHttp().getRequest();
    const token = extractTokenfromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.Jwtservice.verifyAsync(token);
      request['user'] = payload; //give the small userobject back in the request body
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
