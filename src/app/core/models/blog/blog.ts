import { DateTime } from 'luxon'
import { Tag } from '../tag/tag';
import { StrictOmit } from '../../utils/types/strict-omit';

/** Blog base. */
export class BlogBase {

  /** Title. */
  public readonly title: string;

  /** Content. */
  public readonly content: string;

  /** Rubric. */
  readonly rubric: string | null;

  public constructor(data: BlogBase) {
    this.content = data.content;
    this.title = data.title;
    this.rubric = data.rubric;
  }
}

/** Blog. */
export class Blog extends BlogBase {

  /** Id. */
  public readonly id: number;

  /** Author name. */
  public readonly authorName: string;

  /** Date when blog was created. */
  public readonly createdAt: DateTime;

  /** Tags. */
  readonly tags: readonly Tag[];

  public constructor(data: Blog) {
    super({
      content: data.content,
      title: data.title,
      rubric: data.rubric,
    })
    this.authorName = data.authorName;
    this.createdAt = data.createdAt;
    this.id = data.id;
    this.tags = data.tags;
  }
}

export class BlogToCreate extends BlogBase {

  /** Tags */
  readonly tags: readonly string[];

  public constructor(
    data: BlogToCreate,
  ) {
    super({
      content: data.content,
      rubric: data.rubric,
      title: data.title,
    });
    this.tags = data.tags;
  }
}
