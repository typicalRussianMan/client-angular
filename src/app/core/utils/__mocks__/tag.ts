import { faker } from "@faker-js/faker";
import { TagDto } from "../../models/tag/tag.dto";

const TAGS_COUNT = 100;

const TAGS_FAKE: readonly TagDto[] = Array(100).fill(0).map(() => ({
  id: faker.number.int(),
  name: faker.word.noun(),
}))

export function allFakeTags(): readonly TagDto[] {
  return TAGS_FAKE;
}

export function fakeTags(count = 5): readonly TagDto[] {
  return [...TAGS_FAKE].sort(() => Math.random() - 0.5).slice(0, count);
}
