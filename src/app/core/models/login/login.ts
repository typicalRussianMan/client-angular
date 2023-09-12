
/** User login data. */
export class Login {

  /** Email. */
  public readonly email: string;

  /** Password. */
  public readonly password: string;

  public constructor(data: Login) {
    this.email = data.email;
    this.password = data.password;
  }
}
