import { TagDto } from "../tag/tag.dto";

/** Blog base DTO. */
export interface BlogBaseDto {

  /** Title. */
  readonly title: string;

  /** Content. */
  readonly content: string;

  /** Rubric. */
  readonly rubric: string | null;

  /** Tags. */
  readonly tags: readonly TagDto[];
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

