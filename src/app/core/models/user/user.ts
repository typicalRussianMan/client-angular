
/** User. */
export class User {

  /** Id. */
  public readonly id: string;

  /** Display name. */
  public readonly name: string;

  /** Email. */
  public readonly email: string;

  public constructor(data: User) {
    this.email = data.email;
    this.id = data.id;
    this.name = data.name;
  }
}
