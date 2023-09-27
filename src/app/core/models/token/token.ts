
/** Token. */
export class Token {

  /** Access token. */
  public readonly access: string;

  public constructor(data: Token) {
    this.access = data.access;
  }
}
