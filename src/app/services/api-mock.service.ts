import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of, timer } from "rxjs";
import { allFakeBlogs, findBlogById } from "../core/utils/__mocks__/blog";
import { fakeUser } from "../core/utils/__mocks__/user";
import { allFakeRubrics, fakeRubric } from "../core/utils/__mocks__/rubric";
import { allFakeTags } from "../core/utils/__mocks__/tag";
import { StorageService } from "./storage.service";
import { UserDto } from "../core/models/user/user.dto";
import { BlogDto, BlogToCreateDto } from "../core/models/blog/blog.dto";
import { RubricBaseDto, RubricDto } from "../core/models/rubric/rubric.dto";
import { TagDto } from "../core/models/tag/tag.dto";
import { StrictOmit } from "../core/utils/types/strict-omit";
import { faker } from "@faker-js/faker";
import { randomItem } from "../core/utils/faker/random-array-item";
import { DateTime } from "luxon";

const BLOGS_REGEX = /blogs/;
const BLOG_REGEX = /blogs\/([0-9]+)/gm;

const USER_REGEX = /user/;
const VERIFY_TOKEN_REGEX = /token\/verify/;
const LOGIN_REGEX = /login/;

const TAG_REGEX = /tags/;

const RUBRICS_REGEX = /rubrics/;
const RUBRIC_REGEX = /rubrics\/([0-9]+)/gm;

const RESPONSE_DELAY = 200;

const STORE_BLOGS_KEY = '__blogs__';
const STORE_USERS_KEY = '__users__';
const STORE_TAGS_KEY = '__tags__';
const STORE_RUBRICS_KEY = '__rubrics__';

type UserNoBlogs = StrictOmit<UserDto, 'blogs'>;

@Injectable({ providedIn: 'root' })
export class ApiMockService extends HttpClient {

  private user!: UserDto;

  private users!: UserDto[];

  private blogs!: BlogDto[];

  private rubrics!: RubricDto[];

  private tags!: TagDto[];

  public constructor(
    private readonly storage: StorageService,
    httpHandler: HttpHandler
  ) {
    super(httpHandler);

    this.initStore();
  }

  private initStore(): void {
    if (
      !this.storage.hasItem(STORE_BLOGS_KEY) ||
      !this.storage.hasItem(STORE_RUBRICS_KEY) ||
      !this.storage.hasItem(STORE_TAGS_KEY) ||
      !this.storage.hasItem(STORE_USERS_KEY)
    ) {
      this.fulfilStore();
    }

    this.retrieveData();
  }

  private fulfilStore(): void {
    const USERS: readonly UserNoBlogs[] = new Array(10)
      .fill(0)
      .map(() => ({
        email: faker.internet.email(),
        id: faker.internet.ipv4(),
        userName: faker.internet.displayName(),
      }));

    const RUBRICS: readonly RubricDto[] = new Array(100).fill(0).map(() => ({
      id: faker.number.int(),
      name: faker.word.noun(),
    }));

    const TAGS: readonly TagDto[] = new Array(100).fill(0).map(() => ({
      id: faker.number.int(),
      name: faker.word.noun(),
    }));

    const BLOGS: readonly BlogDto[] = new Array(100).fill(0).map(() => ({
      content: faker.lorem.paragraphs(),
      createdAt: DateTime.fromJSDate(faker.date.recent({ days: 10 })).toISO() ?? '',
      id: faker.number.int(),
      rubric: randomItem(RUBRICS).name,
      tags: [...TAGS].sort(() => Math.random() - 0.5).slice(0, 5),
      title: faker.lorem.sentence(3),
      userName: randomItem(USERS).userName,
    }));

    this.storage.setItem(STORE_BLOGS_KEY, BLOGS);
    this.storage.setItem(STORE_USERS_KEY, USERS);
    this.storage.setItem(STORE_TAGS_KEY, TAGS);
    this.storage.setItem(STORE_RUBRICS_KEY, RUBRICS);
  }

  private retrieveData(): void {
    this.blogs = this.storage.getItem<BlogDto[]>(STORE_BLOGS_KEY) ?? [];
    this.tags = this.storage.getItem<TagDto[]>(STORE_TAGS_KEY) ?? [];
    this.users = this.storage.getItem<UserDto[]>(STORE_USERS_KEY) ?? [];
    this.rubrics = this.storage.getItem<RubricDto[]>(STORE_RUBRICS_KEY) ?? [];
    this.user = randomItem(this.users);
  }

  private syncDataWithStorage(): void {
    this.storage.setItem(STORE_BLOGS_KEY, this.blogs);
    this.storage.setItem(STORE_USERS_KEY, this.users);
    this.storage.setItem(STORE_TAGS_KEY, this.tags);
    this.storage.setItem(STORE_RUBRICS_KEY, this.rubrics);
  }

  override get<T>(url: string, options?: unknown): Observable<any> {
    this.syncDataWithStorage()
    return timer(RESPONSE_DELAY).pipe(
      map(() => {
        if (BLOG_REGEX.test(url)) {
          const id = Number(url.match(BLOG_REGEX)?.[0].split('/')[1]);
          const blog = this.blogs.find(blog => blog.id == id)

          if (blog === null) {
            throw new Error(`Cannot find blog with requested id: ${id}`);
          }

          return blog;
        }

        if (BLOGS_REGEX.test(url)) {
          const queryParams = new URLSearchParams(url.split('?')[1]);

          const offset = Number(queryParams.get('offset') ?? 0);
          const limit = Number(queryParams.get('limit') ?? 10);
          const rubric = queryParams.get('rubric');
          const tag = queryParams.get('tag');

          let blogs = this.blogs;

          if (rubric) {
            blogs = blogs.filter(e => e.rubric === rubric);
          }

          if (tag) {
            blogs = blogs.filter(e => e.tags.some(q => q.name === tag));
          }

          return blogs.slice(offset, offset + limit);
        }

        if (USER_REGEX.test(url)) {
          return {
            ...this.user,
            blogs: this.blogs.filter(b => b.userName == this.user.userName),
          } satisfies UserDto;
        }

        if (RUBRIC_REGEX.test(url)) {
          const id = Number(url.match(BLOG_REGEX)?.[0].split('/')[1]);
          const rubric = this.rubrics.find(rubric => rubric.id == id)

          if (rubric === null) {
            throw new Error(`Cannot find blog with requested id: ${id}`);
          }

          return rubric;
        }

        if (RUBRICS_REGEX.test(url)) {
          return this.rubrics;
        }

        if (TAG_REGEX.test(url)) {
          return this.tags;
        }

        return void 0;
      })
    );
  }

  override post<T>(url: string, body: unknown, options?: unknown): Observable<any> {
    this.syncDataWithStorage()
    return timer(RESPONSE_DELAY).pipe(
      map(() => {
        if (VERIFY_TOKEN_REGEX.test(url)) {
          return void 0;
        }

        if (LOGIN_REGEX.test(url)) {
          return { accessToken: 'qwe123qwe' };
        }

        if (BLOGS_REGEX.test(url)) {
          const blog = body as BlogToCreateDto;

          this.blogs.push({
            ...blog,
            id: this.blogs.length,
            userName: this.user.userName,
            createdAt: DateTime.now().toISO() ?? '',
            tags: blog.tags.map(tag => {
              const tagDto = this.tags.find(t => t.name === tag);

              if (tagDto == null) {
                const newTag = {
                  id: this.tags.length,
                  name: tag,
                }

                this.tags.push(newTag);

                return newTag
              }

              return tagDto
            }),
            rubric: (() => {
              if (!this.rubrics.some(r => r.name == blog.rubric)) {
                this.rubrics.push({ id: this.rubrics.length, name: blog.rubric as string });
              }

              return blog.rubric;
            })()
          });
          return void 0;
        }

        if (RUBRICS_REGEX.test(url)) {
          this.rubrics.push(body as RubricDto);
        }

        return void 0;
      }),
    );
  }

  override delete<T>(url: string): Observable<any> {
    this.syncDataWithStorage()
    return timer(RESPONSE_DELAY).pipe(
      map(() => {
        if (BLOG_REGEX.test(url)) {
          const id = Number(url.match(BLOG_REGEX)?.[0].split('/')[1]);
          this.blogs = this.blogs.filter(e => e.id != id);
          return void 0;
        }

        if (RUBRIC_REGEX.test(url)) {
          const id = Number(url.match(RUBRIC_REGEX)?.[0].split('/')[1]);
          this.rubrics = this.rubrics.filter(e => e.id != id);
          return void 0;
        }

        return void 0;
      })
    );
  }

  override patch<T>(url: string, body: unknown, options?: unknown): Observable<any> {
    this.syncDataWithStorage();
    return timer(RESPONSE_DELAY).pipe(
      map(() => {

        if (BLOG_REGEX.test(url)) {
          const id = Number(url.match(BLOG_REGEX)?.[0].split('/')[1]);
          const blogId = this.blogs.findIndex(e => e.id == id);
          const blog = body as BlogToCreateDto
          this.blogs[blogId] = {
            ...blog,
            id: this.blogs.length,
            userName: this.user.userName,
            createdAt: DateTime.now().toISO() ?? '',
            tags: blog.tags.map(tag => {
              const tagDto = this.tags.find(t => t.name === tag);

              if (tagDto == null) {
                const newTag = {
                  id: this.tags.length,
                  name: tag,
                }

                this.tags.push(newTag);

                return newTag
              }

              return tagDto
            }),
            rubric: (() => {
              if (!this.rubrics.some(r => r.name == blog.rubric)) {
                this.rubrics.push({ id: this.rubrics.length, name: blog.rubric as string });
              }

              return blog.rubric;
            })()
          }
          return void 0;
        }

        if (RUBRIC_REGEX.test(url)) {
          const id = Number(url.match(RUBRIC_REGEX)?.[0].split('/')[1]);
          const rubId = this.rubrics.findIndex(e => e.id == id);
          this.rubrics[rubId] = { id, name: (body as RubricBaseDto).name }
          return void 0;
        }

        return void 0;
      })
    );
  }
}
