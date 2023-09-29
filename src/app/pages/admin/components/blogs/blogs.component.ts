import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/services/blog.service';

/** Blogs component. */
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsComponent {

  /** Blogs. */
  protected readonly blogs$: Observable<readonly Blog[]>;

  public constructor(
    blogService: BlogService,
    private readonly router: Router,
  ) {
    this.blogs$ = blogService.getBlogs();
  }

  /**
   * Created track by function for blogs.
   * @param _index Index.
   * @param blog Blog.
   */
  protected trackByBlog(_index: number, blog: Blog): Blog['id'] {
    return blog.id;
  }

  /**
   * Formats date-time to readable form.
   * @param dateTime
   * @returns
   */
  protected formatDateTime(dateTime: DateTime): string {
    return dateTime.toFormat('DD \' at \' T')
  }

  /**
   * Navigates to edit blog page.
   * @param id Blog ID.
   */
  protected navigateToEdit(id: number): void {
    this.router.navigate(['admin','blogs', 'edit', id]);
  }
}
