import { DateTime } from 'luxon'

export class BlogBase {

  /** Title. */
  public readonly title: string;

  /** Content. */
  public readonly content: string;

  public constructor(data: BlogBase) {
    this.content = data.content;
    this.title = data.title;
  }
}

/** Blog. */
export class Blog extends BlogBase {

  /** Id. */
  public readonly id: number;

  /** Author name. */
  public readonly authorName: string;

  /** Date string when blog was created. */
  public readonly createdAt: DateTime;

  public constructor(data: Blog) {
    super({
      content: data.content,
      title: data.title,
    })
    this.authorName = data.authorName;
    this.createdAt = data.createdAt;
    this.id = data.id;
  }
}
