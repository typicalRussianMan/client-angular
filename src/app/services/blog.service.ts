import { Injectable } from '@angular/core';
import { NEVER, Observable, catchError, map, throwError } from 'rxjs';
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

  private readonly blogUrlWithId = (id: Blog['id']) => `${this.blogUrl}/${id}`

  public constructor(
    private readonly http: HttpClient,
    private readonly blogMapper: BlogMapper,
    private readonly userService: UserService,
    private readonly errorMapper: AppErrorMapper,
    appConfig: AppConfigService,
  ) {
    this.blogUrl = new URL('blogs', appConfig.apiUrl);
  }

  /** Gets all blogs. */
  public getBlogs(): Observable<readonly Blog[]> {
    return this.http.get<readonly BlogDto[]>(this.blogUrl.toString())
      .pipe(
        map(blogs => blogs.map(this.blogMapper.fromDto)),
        catchError(() => {
          this.userService.logout();
          return NEVER;
        }),
      );
  }

  /**
   * Edits blog.
   * @param id Blog id.
   * @param blog Updated blog.
   */
  public editBlog(id: Blog['id'], blog: BlogBase): Observable<void> {
    return this.http.patch(
      this.blogUrlWithId(id),
      { ...this.blogMapper.toDto(blog), tagNames: blog.tags.join(',') }
    ).pipe(
        map(() => void 0),
        catchError(err => {
          if (isAppErrorDto(err)) {
            return throwError(this.errorMapper.fromDto(err))
          }

          return NEVER;
        })
      );
  }

  /**
   * Creates new blog.
   * @param blog Blog.
   */
  public createBlog(blog: BlogBase): Observable<void> {
    return this.http.post(
      this.blogUrl.toString(),
      { ...this.blogMapper.toDto(blog), tagNames: blog.tags.join(',') },
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

  /**
   * Gets blog by id.
   * @param id Blog id.
   */
  public getBlog(id: Blog['id']): Observable<Blog> {
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

  /**
   * Deletes blog by id.
   * @param id Id.
   */
  public deleteBlog(id: Blog['id']): Observable<void> {
    const url = this.blogUrlWithId(id);
    return this.http.delete(url)
    .pipe(
      map(() => void 0),
      catchError(err => {
        if (isAppErrorDto(err)) {
          return throwError(this.errorMapper.fromDto(err))
        }

        return NEVER;
      }),
    )
  }
}
