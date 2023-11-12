import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { Blog, BlogToCreate } from '../core/models/blog/blog';
import { BlogMapper } from '../core/models/blog/blog.mapper';
import { BlogDto } from '../core/models/blog/blog.dto';
import { CrudService } from '../core/utils/crud-service';
import { ApiMockService } from './api-mock.service';
interface Query {
  offset: number;
  limit: number;
  rubric: string | null;
  tag: string | null;
}
@Injectable({ providedIn: 'root' })
export class BlogService extends CrudService<BlogDto, BlogToCreate>('blogs') {

  private httpClient = inject(ApiMockService);

  public constructor(
    private readonly blogMapper: BlogMapper,
  ) {
    super();
  }

  /** Gets all blogs. */
  public getBlogs(query: Partial<Query>): Observable<readonly Blog[]> {
    const params = new URLSearchParams(query as Record<any, any>);
    return this.httpClient.get<readonly BlogDto[]>(`${this.routeUrl.toString()}?${params}`)
      .pipe(
        map((blogs: BlogDto[]) => blogs.map(blog => this.blogMapper.fromDto(blog))),
      );
  }

  public blogsLength(): Observable<number> {
    return this.getBlogs({ limit: 1000 }).pipe(
      map(e => e.length),
    );
  }

  /**
   * Edits blog.
   * @param id Blog id.
   * @param blog Updated blog.
   */
  public editBlog(id: Blog['id'], blog: BlogToCreate): Observable<void> {
    return this.update(id, this.blogMapper.toDto(blog));
  }

  /**
   * Creates new blog.
   * @param blog Blog.
   */
  public createBlog(blog: BlogToCreate): Observable<void> {
    return this.create(this.blogMapper.toDto(blog));
  }

  /**
   * Gets blog by id.
   * @param id Blog id.
   */
  public getBlog(id: Blog['id']): Observable<Blog> {
    return this.getById(id)
      .pipe(
        map(blog => this.blogMapper.fromDto(blog)),
      );
  }

  /**
   * Deletes blog by id.
   * @param id Id.
   */
  public deleteBlog(id: Blog['id']): Observable<void> {
    return this.delete(id);
  }
}
