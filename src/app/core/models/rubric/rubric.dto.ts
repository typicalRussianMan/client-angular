import { StrictOmit } from "../../utils/types/strict-omit";

/** Rubric DTO. */
export interface RubricDto {

  /** Name. */
  readonly name: string;

  readonly id: number;
}

export type RubricBaseDto = StrictOmit<RubricDto, 'id'>;
