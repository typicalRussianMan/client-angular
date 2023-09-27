import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsComponent {

  protected readonly blogs$: Observable<readonly Blog[]>;

  public constructor(
    blogService: BlogService,
  ) {
    this.blogs$ = blogService.getBlogs();
  }

  protected trackByBlog(_index: number, blog: Blog): Blog['id'] {
    return blog.id;
  }

  protected formatDateTime(dateTime: DateTime): string {
    return dateTime.toFormat('DD \' at \' T')
  }
}
