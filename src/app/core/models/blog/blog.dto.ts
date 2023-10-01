
/** Blog base DTO. */
export interface BlogBaseDto {

  /** Title. */
  readonly title: string;

  /** Content. */
  readonly content: string;

  /** Rubric. */
  readonly rubric: string | null;

  /** Tags. */
  readonly tags: readonly string[];
}

/** Blog DTO. */
export interface BlogDto extends BlogBaseDto {

  /** Id. */
  readonly id: number;

  /** Author name. */
  readonly userName: string;

  /** Date string when blog was created. */
  readonly createdAt: string;
}

