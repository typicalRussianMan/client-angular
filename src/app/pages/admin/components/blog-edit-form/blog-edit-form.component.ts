import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, NEVER, catchError, switchMap, tap, of } from 'rxjs';
import { AbstractFormComponent } from 'src/app/components/abstract-form/abstract-form.component';
import { AppError } from 'src/app/core/models/app-error/app-error';
import { BlogBase, BlogToCreate } from 'src/app/core/models/blog/blog';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { FlatControlsOf } from 'src/app/core/utils/forms/controls';
import { StrictOmit } from 'src/app/core/utils/types/strict-omit';
import { BlogService } from 'src/app/services/blog.service';
import { NotificationService } from 'src/app/services/notification.service';

type EditBlogForm = StrictOmit<BlogToCreate, 'tags'> & { tags: string };

type CreateBlogFormControls = FlatControlsOf<EditBlogForm>

@Destroyable()
@Component({
  selector: 'app-blog-edit-form',
  templateUrl: './blog-edit-form.component.html',
  styleUrls: ['./blog-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogEditFormComponent extends AbstractFormComponent<EditBlogForm> implements OnInit {

  /** Page title. */
  protected readonly title$ = new BehaviorSubject<string | null>(null);

  protected readonly isLoading$ = new BehaviorSubject(false);

  private readonly id$ = new BehaviorSubject<string | null>(null);

  protected readonly form = this.fb.group<CreateBlogFormControls>({
    content: this.fb.control('', Validators.required),
    title: this.fb.control('', Validators.required),
    rubric: this.fb.control('', Validators.required),
    tags: this.fb.control(''),
  });

  public constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notification: NotificationService,
  ) {
    super();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.route.params.pipe(
      tap(() => this.isLoading$.next(true)),
      switchMap(params => {
        const id = params['id'];

        if (id === undefined) {
          this.title$.next('New blog');
          return NEVER;
        }

        this.title$.next('Edit Blog');
        this.id$.next(id);

        return this.blogService.getBlog(id)
          .pipe(
            tap(blog => {
              this.form.patchValue({
                content: blog.content,
                rubric: blog.rubric,
                title: blog.title,
                tags: blog.tags.map(e => e.name).join(','),
              });
            }),
            catchError(() => this.router.navigate(['/'])),
          )
      }),
      tap(() => this.isLoading$.next(false)),
      takeUntilDestroy(this),
    )
      .subscribe()
  }

  /** Handles form submitting. */
  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.getRawValue();

    this.isLoading$.next(true);

    const tags = formData.tags
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    const blog = new BlogToCreate({
      content: formData.content.trim(),
      title: formData.title.trim(),
      rubric: formData.rubric?.trim() ?? null,
      tags: tags as any,
    })

    this.id$.pipe(
      switchMap(id => {
        if (!id) {
          return this.blogService.createBlog(blog);
        }

        return this.blogService.editBlog(Number(id), blog)
      }),
      tap(() => {
        this.router.navigate(['/']);
      }),
      catchError((err: AppError) => {
        this.notification.showAppError(err);
        return of(void 0);
      }),
      tap(() => this.isLoading$.next(false)),
      takeUntilDestroy(this),
    ).subscribe();
  }
}
