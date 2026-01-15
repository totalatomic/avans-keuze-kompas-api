import { Global, Module, Get } from '@nestjs/common';
import { EnvConfigModel } from "../env";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthInjectionToken } from './auth.injection.token';
import { Authguard } from './auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<EnvConfigModel>) => ({
        global: true,
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: '1h' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    Authguard
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule { }