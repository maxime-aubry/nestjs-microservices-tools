import {
  EnvironmentConfigService,
  type IJwtConfiguration,
} from '@app/nestjs-microservices-tools/config/environment-config';
import { Inject, Injectable } from '@nestjs/common';
import { JwtVerifyOptions, JwtService as NestJsJwtService } from '@nestjs/jwt';
import type { JwtPayload } from './jwt-payload';
import { TokensBundle } from './tokens-bundle';

@Injectable()
export class JwtService {
  constructor(
    @Inject(JwtService) protected readonly jwtService: NestJsJwtService,
    @Inject(EnvironmentConfigService) private readonly jwtConfig: IJwtConfiguration,
  ) {}

  public async checkRefreshTokenAsync(token: string): Promise<JwtPayload> {
    const options: JwtVerifyOptions = {
      secret: this.jwtConfig.getJwtRefreshSecret(),
    };
    const decode: JwtPayload = await this.jwtService.verifyAsync<JwtPayload>(token, options);
    return decode;
  }

  public getTokensBundle(payload: JwtPayload): TokensBundle {
    const token: string = this.generateAccessToken(payload);
    const refreshToken: string = this.generateRefreshToken(payload);
    // const cookieOfToken: string = this.generateCookie(token);
    // const cookieOfRefreshToken: string = this.generateRefreshCookie(refreshToken);
    const authElements: TokensBundle = new TokensBundle(
      token,
      refreshToken,
      // cookieOfToken,
      // cookieOfRefreshToken,
    );
    return authElements;
  }

  private generateAccessToken(payload: JwtPayload): string {
    const secret: string = this.jwtConfig.getJwtSecret();
    const expirationTime: number = this.jwtConfig.getJwtExpirationTime();
    const token: string = this.createToken(payload, secret, expirationTime);
    return token;
  }

  private generateRefreshToken(payload: JwtPayload): string {
    const secret: string = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn: number = this.jwtConfig.getJwtRefreshExpirationTime();
    const token: string = this.createToken(payload, secret, expiresIn);
    return token;
  }

  private createToken(payload: JwtPayload, secret: string, expiresIn: number): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }

  // private generateCookie(token: string): string {
  //   const cookie: string = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  //   return cookie;
  // }

  // private generateRefreshCookie(refreshToken: string): string {
  //   const cookie: string = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
  //   return cookie;
  // }
}
