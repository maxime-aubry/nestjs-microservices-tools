import { EnvironmentConfigModule } from '@app/nestjs-microservices-tools/config';
import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtRefreshTokenGeneratorService } from './jwt-refresh-token-generator.service';
import { JwtTokenGeneratorService } from './jwt-token-generator.service';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    EnvironmentConfigModule,
  ],
  providers: [JwtRefreshTokenGeneratorService, JwtTokenGeneratorService],
  exports: [JwtRefreshTokenGeneratorService, JwtTokenGeneratorService],
})
export class JwtModule {}
