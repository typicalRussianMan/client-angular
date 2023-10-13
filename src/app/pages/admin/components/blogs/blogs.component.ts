import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, NEVER, Observable, catchError, of, switchMap, tap } from 'rxjs';
import { AppError } from 'src/app/core/models/app-error/app-error';
import { Blog } from 'src/app/core/models/blog/blog';
import { trackById, trackByValue } from 'src/app/core/utils/angular/track-by';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { BlogService } from 'src/app/services/blog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

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
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {
    this.blogs$ = this.updateBlogEffect$.pipe(
      switchMap(() => blogService.getBlogs()),
      catchError((e: AppError) => {
        this.notificationService.showAppError(e);
        this.userService.logout();

        return NEVER;
      })
    );
  }

  /** Track by function for blogs. */
  protected trackByBlog = trackById<Blog>();

  /** Track by tag. */
  protected trackByTag = trackByValue<Blog>();

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

          return of(void 0);
        }),
        takeUntilDestroy(this),
      ).subscribe();
  }
}
