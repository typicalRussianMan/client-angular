import { DateTime } from 'luxon'

/** Blog. */
export class Blog {

  /** Id. */
  public readonly id: number;

  /** Title. */
  public readonly title: string;

  /** Content. */
  public readonly content: string;

  /** Author name. */
  public readonly authorName: string;

  /** Date string when blog was created. */
  public readonly createdAt: DateTime;

  public constructor(data: Blog) {
    this.authorName = data.authorName;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.title = data.title;
  }
}
