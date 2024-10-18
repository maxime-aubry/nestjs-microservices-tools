import type { JwtTokenPayloadModel } from 'apps/auth/src/domain/models';

export interface IJwtTokenGenerator {
  generateToken(payload: JwtTokenPayloadModel): string;
  generateCookieWithToken(token: string): string;
}
