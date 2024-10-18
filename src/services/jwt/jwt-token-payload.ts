export class JwtTokenPayload {
  constructor(id: string, firstname: string, lastname: string, username: string, email: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
  }

  public id: string;
  public firstname: string;
  public lastname: string;
  public username: string;
  public email: string;
}
