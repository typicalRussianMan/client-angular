import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NEVER, catchError, tap } from 'rxjs';
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
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent extends AbstractFormComponent<BlogBase> {

  protected readonly form = this.fb.group<CreateBlogFormControls>({
    content: this.fb.control('', Validators.required),
    title: this.fb.control('', Validators.required),
  });

  public constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly notification: NotificationService,
  ) {
    super();
  }

  public onSubmit(form: FormGroup<CreateBlogFormControls>): void {
    form.markAllAsTouched();

    if (form.invalid) {
      return;
    }

    const formData = form.getRawValue();

    this.blogService.createBlog(new BlogBase({
      content: formData.content,
      title: formData.title,
    })).pipe(
      tap(() => {
        this.router.navigate(['/']);
      }),
      catchError((err: AppError) => {
        this.notification.showAppError(err);

        return NEVER;
      }),
      takeUntilDestroy(this),
    ).subscribe()
  }
}
