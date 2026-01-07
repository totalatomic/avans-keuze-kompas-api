import { Global, Module } from "@nestjs/common";
import { envConfiguration } from "../env";

@Global()
@Module({
  imports: [],
  providers: [],
  exports: []
})
export class AuthModule { }