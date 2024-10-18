export interface IJwtConfiguration {
  getJwtSecret(): string;
  getJwtExpirationTime(): number;
  getJwtRefreshSecret(): string;
  getJwtRefreshExpirationTime(): number;
}
