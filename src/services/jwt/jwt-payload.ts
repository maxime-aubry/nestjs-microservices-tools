export class JwtPayload {
  constructor(sub: string, email: string) {
    this.sub = sub;
    this.email = email;
  }

  public sub: string;
  public email: string;
}
