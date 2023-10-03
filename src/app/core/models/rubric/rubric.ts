import { StrictOmit } from '../../utils/types/strict-omit';

/** Rubric */
export class Rubric {

  /** Name. */
  readonly name: string;

  /** Id. */
  readonly id: number;

  public constructor(data: Rubric) {
    this.name = data.name;
    this.id = data.id;
  }
}

export type RubricBase = StrictOmit<Rubric, 'id'>;
