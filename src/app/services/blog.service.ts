import { Injectable } from '@angular/core';
import { NEVER, Observable, catchError, map, throwError, tap } from 'rxjs';
import { Blog, BlogBase } from '../core/models/blog/blog';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { BlogMapper } from '../core/models/blog/blog.mapper';
import { BlogDto } from '../core/models/blog/blog.dto';
import { UserService } from './user.service';
import { AppErrorMapper } from '../core/models/app-error/app-error.mapper';
import { isAppErrorDto } from '../core/models/app-error/app-error.dto';

@Injectable({ providedIn: 'root' })
export class BlogService {

  private readonly blogUrl: URL;

  public constructor(
    private readonly http: HttpClient,
    private readonly blogMapper: BlogMapper,
    private readonly userService: UserService,
    private readonly errorMapper: AppErrorMapper,
    appConfig: AppConfigService,
  ) {
    this.blogUrl = new URL('blogs', appConfig.apiUrl);
  }

  public getBlogs(): Observable<readonly Blog[]> {
    return this.http.get<readonly BlogDto[]>(this.blogUrl.toString())
      .pipe(
        map(blogs => blogs.map(this.blogMapper.fromDto)),
        // @ts-ignore
        tap(e => console.log(e)),
        catchError(() => {
          this.userService.logout();
          return NEVER;
        })
      );
  }

  public editBlog(id: string, blog: BlogBase): Observable<void> {
    const url = `${this.blogUrl}/${id}`;
    console.log(url)
    return this.http.patch(url, this.blogMapper.toDto(blog)).pipe(
        map(() => void 0),
        catchError(err => {
          if (isAppErrorDto(err)) {
            return throwError(this.errorMapper.fromDto(err))
          }

          return NEVER;
        })
      )
  }

  public createBlog(blog: BlogBase): Observable<void> {
    return this.http.post(
      this.blogUrl.toString(),
      this.blogMapper.toDto(blog),
    ).pipe(
      map(() => void 0),
      catchError(err => {
        if (isAppErrorDto(err)) {
          return throwError(this.errorMapper.fromDto(err))
        }

        return NEVER;
      })
    )
  }

  public getBlog(id: string): Observable<Blog> {
    const url = `${this.blogUrl}/${id}`;
    return this.http.get<BlogDto>(url)
      .pipe(
        map(this.blogMapper.fromDto),
        catchError(err => {
          if (isAppErrorDto(err)) {
            return throwError(this.errorMapper.fromDto(err))
          }

          return NEVER;
        }),
      )
  }
}
