
/** Blog DTO. */
export interface BlogDto {

  /** Id. */
  readonly id: number;

  /** Title. */
  readonly title: string;

  /** Content. */
  readonly content: string;

  /** Author name. */
  readonly authorName: string;

  /** Date string when blog was created. */
  readonly createdAt: string;
}
