import type { IJwtConfiguration } from '@app/nestjs-microservices-tools/config/environment-config';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JwtTokenPayloadModel } from 'apps/auth/src/domain/models';
import type { IJwtTokenGenerator } from './jwt-token-generator.interface';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class JwtTokenGeneratorService extends JwtTokenService implements IJwtTokenGenerator {
  constructor(
    @Inject(JwtService) protected readonly jwtService: JwtService,
    @Inject('IJwtConfig') private readonly jwtConfig: IJwtConfiguration,
  ) {
    super(jwtService);
  }

  public generateToken(payload: JwtTokenPayloadModel): string {
    const secret: string = this.jwtConfig.getJwtSecret();
    const expirationTime: string = `${this.jwtConfig.getJwtExpirationTime()}s`;
    const token: string = this.createToken(payload, secret, expirationTime);
    return token;
  }

  public generateCookieWithToken(token: string): string {
    const cookie: string = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
    return cookie;
  }
}
