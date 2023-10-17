import { faker } from "@faker-js/faker";

export const FAKE_USER_NAMES: readonly string[] = new Array(10)
  .fill(0)
  .map(() => faker.internet.displayName());

export function fakeUserName(): string {
  return FAKE_USER_NAMES[
    faker.number.int({ min: 0, max: FAKE_USER_NAMES.length - 1 })
  ];
}
