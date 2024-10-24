import {
  EnvironmentConfigModule,
  EnvironmentConfigService,
  type IJwtConfiguration,
} from '@app/nestjs-microservices-tools/config/environment-config';
import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtService } from './jwt-token.service';

@Module({
  imports: [
    Jwt.registerAsync({
      useFactory: (jwtConfig: IJwtConfiguration) => {
        return {
          secret: jwtConfig.getJwtSecret(),
          signOptions: {
            expiresIn: jwtConfig.getJwtExpirationTime(),
          },
        };
      },
      inject: [EnvironmentConfigService],
    }),
    EnvironmentConfigModule,
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
