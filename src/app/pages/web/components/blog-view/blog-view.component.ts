import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { BehaviorSubject, tap } from 'rxjs';
import { Blog } from 'src/app/core/models/blog/blog';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { BlogService } from 'src/app/services/blog.service';

@Destroyable()
@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogViewComponent implements OnInit {

  protected blog$ = new BehaviorSubject<null | Blog>(null);

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogService,
  ) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.blogService.getBlog(id).pipe(
      tap(blog => this.blog$.next(blog)),
      takeUntilDestroy(this),
    )
      .subscribe();
  }

  protected createdAt(dateTime: DateTime): string {
    return dateTime.toFormat('DD \' at \' T');
  }
}
