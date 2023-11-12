import { faker } from "@faker-js/faker";
import { UserDto } from "../../models/user/user.dto";
import { allFakeBlogs, fakeBlogList } from "./blog";
import { fakeUserName } from "./user-names";

const userName = fakeUserName();

const USER_MOCK: UserDto = {
  id: faker.internet.ipv4(),
  blogs: allFakeBlogs().filter(e => e.userName === userName),
  email: faker.internet.email(),
  userName,
}

export function fakeUser(): UserDto {
  return USER_MOCK;
}
