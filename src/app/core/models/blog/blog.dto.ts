
export interface BlogBaseDto {

  /** Title. */
  readonly title: string;

  /** Content. */
  readonly content: string;
}

/** Blog DTO. */
export interface BlogDto extends BlogBaseDto {

  /** Id. */
  readonly id: number;

  /** Author name. */
  readonly authorName: string;

  /** Date string when blog was created. */
  readonly createdAt: string;
}

