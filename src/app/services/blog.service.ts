import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Blog, BlogBase } from '../core/models/blog/blog';
import { BlogMapper } from '../core/models/blog/blog.mapper';
import { BlogBaseDto, BlogDto } from '../core/models/blog/blog.dto';
import { CrudService } from '../core/utils/crud-service';
import { AppErrorMapper } from '../core/models/app-error/app-error.mapper';

import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class BlogService extends CrudService<BlogDto, BlogBaseDto>('blogs') {

  public constructor(
    private readonly blogMapper: BlogMapper,
    http: HttpClient,
    errorMapper: AppErrorMapper,
    appConfig: AppConfigService,
  ) {
    super(http, errorMapper, appConfig);
  }

  /** Gets all blogs. */
  public getBlogs(): Observable<readonly Blog[]> {
    return this.getAll()
      .pipe(
        map(blogs => blogs.map(this.blogMapper.fromDto)),
      );
  }

  /**
   * Edits blog.
   * @param id Blog id.
   * @param blog Updated blog.
   */
  public editBlog(id: Blog['id'], blog: BlogBase): Observable<void> {
    return this.update(id, this.blogMapper.toDto(blog));
  }

  /**
   * Creates new blog.
   * @param blog Blog.
   */
  public createBlog(blog: BlogBase): Observable<void> {
    return this.create(this.blogMapper.toDto(blog));
  }

  /**
   * Gets blog by id.
   * @param id Blog id.
   */
  public getBlog(id: Blog['id']): Observable<Blog> {
    return this.getById(id)
      .pipe(
        map(this.blogMapper.fromDto),
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
