import { DateTime } from 'luxon'

/** Blog base. */
export class BlogBase {

  /** Title. */
  public readonly title: string;

  /** Content. */
  public readonly content: string;

  /** Rubric. */
  readonly rubric: string | null;

  /** Tags. */
  readonly tags: readonly string[];

  public constructor(data: BlogBase) {
    this.content = data.content;
    this.title = data.title;
    this.rubric = data.rubric;
    this.tags = data.tags;
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
      rubric: data.rubric,
      tags: data.tags,
    })
    this.authorName = data.authorName;
    this.createdAt = data.createdAt;
    this.id = data.id;
  }
}
