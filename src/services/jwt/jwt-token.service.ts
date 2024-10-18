import type { JwtService } from '@nestjs/jwt';
import type { JwtTokenPayload } from './jwt-token-payload';

export class JwtTokenService {
  constructor(protected readonly jwtService: JwtService) {}

  public async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  public createToken(payload: JwtTokenPayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
