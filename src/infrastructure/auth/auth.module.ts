import { Global, Module, Get } from '@nestjs/common';
import { EnvConfigModel } from "../env";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthInjectionToken } from './auth.injection.token';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<EnvConfigModel>) => ({
        global: true,
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: '60m' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService
  ],
  exports: [AuthService],
})
export class AuthModule { }