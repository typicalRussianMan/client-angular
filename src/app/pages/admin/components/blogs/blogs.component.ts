import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, NEVER, Observable, catchError, switchMap, tap } from 'rxjs';
import { AppError } from 'src/app/core/models/app-error/app-error';
import { Blog } from 'src/app/core/models/blog/blog';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { BlogService } from 'src/app/services/blog.service';
import { NotificationService } from 'src/app/services/notification.service';

/** Blogs component. */
@Destroyable()
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsComponent {

  private readonly updateBlogEffect$ = new BehaviorSubject<void>(void 0);

  /** Blogs. */
  protected readonly blogs$: Observable<readonly Blog[]>;

  public constructor(
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {
    this.blogs$ = this.updateBlogEffect$.pipe(
      switchMap(() => blogService.getBlogs()),
    );
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

  protected deleteBlog(blog: Blog): void {
    this.blogService.deleteBlog(blog.id)
      .pipe(
        tap(() => this.updateBlogEffect$.next(void 0)),
        catchError((err: AppError) => {
          this.notificationService.showAppError(err);

          return NEVER;
        }),
        takeUntilDestroy(this),
      ).subscribe();
  }
}
