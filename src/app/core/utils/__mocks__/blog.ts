import { faker } from '@faker-js/faker';
import { BlogDto } from '../../models/blog/blog.dto';
import { fakeUserName } from './user-names';
import { DateTime } from 'luxon';

const BLOGS_COUNT = 100;

const FAKE_BLOGS: readonly BlogDto[] = new Array(BLOGS_COUNT)
  .fill(0)
  .map(() => ({
    userName: fakeUserName(),
    content: faker.lorem.paragraphs(),
    createdAt: DateTime.fromJSDate(faker.date.recent({ days: 10 })).toISO() ?? '',
    id: faker.number.int(100),
    rubric: faker.word.adjective(),
    tags: faker.word.words(5).split(' ').map(e => ({ name: e, id: faker.number.int(1000) })),
    title: faker.lorem.sentence(3),
  }));

export function allFakeBlogs(): readonly BlogDto[] {
  return FAKE_BLOGS;
}

export function fakeBlogList(count = 5): readonly BlogDto[] {
  return [...FAKE_BLOGS].sort(() => Math.random() - 0.5).slice(0, count);
}

export function findBlogById(id: number): BlogDto {
  return FAKE_BLOGS.find(blog => blog.id === id) ?? {
    userName: fakeUserName(),
    content: faker.lorem.paragraphs(),
    createdAt: DateTime.now().toISOTime() ?? '',
    rubric: faker.word.adjective(),
    tags: faker.word.words(5).split(' ').map(e => ({ name: e, id: faker.number.int(1000) })),
    title: faker.lorem.sentence(3),
    id,
  }
}
