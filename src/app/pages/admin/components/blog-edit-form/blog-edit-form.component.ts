import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, NEVER, Observable, catchError, switchMap, tap } from 'rxjs';
import { AbstractFormComponent } from 'src/app/components/abstract-form/abstract-form.component';
import { AppError } from 'src/app/core/models/app-error/app-error';
import { Blog, BlogBase } from 'src/app/core/models/blog/blog';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { FlatControlsOf } from 'src/app/core/utils/forms/controls';
import { StrictOmit } from 'src/app/core/utils/types/strict-omit';
import { BlogService } from 'src/app/services/blog.service';
import { NotificationService } from 'src/app/services/notification.service';

type CreateBlogFormControls = FlatControlsOf<BlogBase>

@Destroyable()
@Component({
  selector: 'app-blog-edit-form',
  templateUrl: './blog-edit-form.component.html',
  styleUrls: ['./blog-edit-form.component.css']
})
export class BlogEditFormComponent extends AbstractFormComponent<BlogBase> implements OnInit {

  /** Page title. */
  protected readonly title$ = new BehaviorSubject<string | null>(null);

  private readonly id$ = new BehaviorSubject<string | null>(null);

  protected readonly form = this.fb.group<CreateBlogFormControls>({
    content: this.fb.control('', Validators.required),
    title: this.fb.control('', Validators.required),
    rubric: this.fb.control('', Validators.required),
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
      switchMap(params => {
        const id = params['id'];

        if (id === undefined) {
          this.title$.next('New blog');
          return NEVER;
        }

        return this.blogService.getBlog(id)
          .pipe(
            tap(blog => {
              this.form.patchValue({
                content: blog.content,
                rubric: blog.rubric,
                title: blog.title,
              });

              this.title$.next('Edit Blog');
              this.id$.next(id);
            }),
            catchError(() => this.router.navigate(['/'])),
          )
      }),
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

    const blog = new BlogBase({
      content: formData.content.trim(),
      title: formData.title.trim(),
      rubric: formData.rubric?.trim() ?? null,
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

        return NEVER;
      }),
      takeUntilDestroy(this),
    ).subscribe();
  }
}
