import { StrictOmit } from "../../utils/types/strict-omit";
import { TagDto } from "../tag/tag.dto";

/** Blog base DTO. */
export interface BlogBaseDto {

  /** Title. */
  readonly title: string;

  /** Content. */
  readonly content: string;

  /** Rubric. */
  readonly rubric: string | null;
}

/** Blog DTO. */
export interface BlogDto extends BlogBaseDto {

  /** Id. */
  readonly id: number;

  /** Author name. */
  readonly userName: string;

  /** Date string when blog was created. */
  readonly createdAt: string;

  /** Tags. */
  readonly tags: readonly TagDto[];
}

/** Blog  */
export interface BlogToCreateDto extends BlogBaseDto {

  /** Tags. */
  readonly tags: readonly string[];
}

