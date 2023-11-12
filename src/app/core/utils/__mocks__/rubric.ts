import { faker } from "@faker-js/faker";
import { RubricDto } from "../../models/rubric/rubric.dto";

const RUBRICS_COUNT = 100;

const RUBRICS_FAKE: readonly RubricDto[] = Array(100).fill(0).map(() => ({
  id: faker.number.int(),
  name: faker.word.noun(),
}))

export function allFakeRubrics(): readonly RubricDto[] {
  return RUBRICS_FAKE;
}

export function fakeRubrics(count = 5): readonly RubricDto[] {
  return [...RUBRICS_FAKE].sort(() => Math.random() - 0.5).slice(0, count);
}

export function fakeRubric(): RubricDto {
  return RUBRICS_FAKE[0];
}
