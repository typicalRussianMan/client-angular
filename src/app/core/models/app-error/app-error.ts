/** App error. */
export class AppError {

  /** Message. */
  public readonly message: string;

  /** Status code. */
  public readonly statusCode: number;

  /** Title. */
  public readonly title: string;

  public constructor(data: AppError) {
    this.message = data.message;
    this.statusCode = data.statusCode;
    this.title = data.title;
  }
}
