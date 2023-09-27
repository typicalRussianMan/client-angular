import { Injectable } from '@angular/core';
import { NEVER, Observable, catchError, map } from 'rxjs';
import { Blog } from '../core/models/blog/blog';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { BlogMapper } from '../core/models/blog/blog.mapper';
import { BlogDto } from '../core/models/blog/blog.dto';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class BlogService {

  private readonly blogUrl: URL;

  public constructor(
    private readonly http: HttpClient,
    private readonly blogMapper: BlogMapper,
    private readonly userService: UserService,
    appConfig: AppConfigService,
  ) {
    this.blogUrl = new URL('blogs', appConfig.apiUrl);
  }

  public getBlogs(): Observable<readonly Blog[]> {
    return this.http.get<readonly BlogDto[]>(this.blogUrl.toString())
      .pipe(
        map(blogs => blogs.map(this.blogMapper.fromDto)),
        catchError(() => {
          this.userService.logout();
          return NEVER;
        })
      );
  }
}
