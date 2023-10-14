import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Blog, BlogToCreate } from '../core/models/blog/blog';
import { BlogMapper } from '../core/models/blog/blog.mapper';
import { BlogDto } from '../core/models/blog/blog.dto';
import { CrudService } from '../core/utils/crud-service';

@Injectable({ providedIn: 'root' })
export class BlogService extends CrudService<BlogDto, BlogToCreate>('blogs') {

  public constructor(
    private readonly blogMapper: BlogMapper,
  ) {
    super();
  }

  /** Gets all blogs. */
  public getBlogs(): Observable<readonly Blog[]> {
    return this.getAll()
      .pipe(
        map(blogs => blogs.map(blog => this.blogMapper.fromDto(blog))),
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
