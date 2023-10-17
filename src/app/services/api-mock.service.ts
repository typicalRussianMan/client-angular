import { HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { allFakeBlogs, findBlogById } from "../core/utils/__mocks__/blog";
import { fakeUser } from "../core/utils/__mocks__/user";
import { allFakeRubrics, fakeRubric } from "../core/utils/__mocks__/rubric";
import { allFakeTags } from "../core/utils/__mocks__/tag";

const BLOGS_REGEX = /blogs/;
const BLOG_REGEX = /blogs\/[0-9]+/;

const USER_REGEX = /user/;
const VERIFY_TOKEN_REGEX = /token\/verify/;
const LOGIN_REGEX = /login/;

const TAG_REGEX = /tags/;

const RUBRICS_REGEX = /rubrics/;
const RUBRIC_REGEX = /rubrics\/[0-9]+/;

@Injectable({ providedIn: 'root' })
export class ApiMockService extends HttpClient {

  override get<T>(url: string, options?: unknown): Observable<any> {
    if (BLOG_REGEX.test(url)) {
      const id = Number(url.split('/')[1]);
      return of(findBlogById(id));
    }

    if (BLOGS_REGEX.test(url)) {
      return of(allFakeBlogs());
    }

    if (USER_REGEX.test(url)) {
      return of(fakeUser());
    }

    if (RUBRIC_REGEX.test(url)) {
      return of(fakeRubric());
    }

    if (RUBRICS_REGEX.test(url)) {
      return of(allFakeRubrics());
    }

    if (TAG_REGEX.test(url)) {

      return of(allFakeTags());
    }

    throw of(void 0);
  }

  override post<T>(url: string, body: unknown, options?: unknown): Observable<any> {
    if (VERIFY_TOKEN_REGEX.test(url)) {
      return of(void 0);
    }

    if (LOGIN_REGEX.test(url)) {
      return of({ accessToken: 'qwe123qwe' })
    }

    throw of(void 0);
  }

  override delete<T>(url: string): Observable<any> {
    return of(void 0);
  }

  override put<T>(url: string, body: unknown, options?: unknown): Observable<any> {
    return of(void 0);
  }
}
