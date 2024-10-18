import type { IJwtConfiguration } from '@app/nestjs-microservices-tools/config/environment-config';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IJwtRefreshTokenGenerator } from './jwt-refresh-token-generator.interface';
import type { JwtTokenPayload } from './jwt-token-payload';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class JwtRefreshTokenGeneratorService extends JwtTokenService implements IJwtRefreshTokenGenerator {
  constructor(
    @Inject(JwtService) protected readonly jwtService: JwtService,
    @Inject('IJwtConfig') private readonly jwtConfig: IJwtConfiguration,
  ) {
    super(jwtService);
  }

  public generateToken(payload: JwtTokenPayload): string {
    const secret: string = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn: string = `${this.jwtConfig.getJwtRefreshExpirationTime()}s`;
    const token: string = this.createToken(payload, secret, expiresIn);
    return token;
  }

  public generateCookieWithToken(token: string): string {
    const cookie: string = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    return cookie;
  }
}
