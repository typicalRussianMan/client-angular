
export class Token {

  public readonly access: string;

  public constructor(data: Token) {
    this.access = data.access;
  }
}
