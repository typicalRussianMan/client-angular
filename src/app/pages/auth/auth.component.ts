import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NEVER, catchError, of, tap } from 'rxjs';
import { AbstractFormComponent } from 'src/app/components/abstract-form/abstract-form.component';
import { AppError } from 'src/app/core/models/app-error/app-error';
import { Login } from 'src/app/core/models/login/login';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { FlatControlsOf } from 'src/app/core/utils/forms/controls';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

type AuthFormControls = FlatControlsOf<Login>;

/** Auth page. */
@Destroyable()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent extends AbstractFormComponent<Login> {

  protected readonly form = this.fb.group<AuthFormControls>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required),
  });

  public constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {
    super();
  }

  protected insertCredentials(): void {
    this.form.patchValue({
      email: 'qwe123qwe@mail.ru',
      password: 'Q-we123qwe',
    })
  }

  /**
   * Handles form submit.
   * @param form Form.
   */
  protected onSubmit(form: FormGroup): void {
    form.markAsTouched();

    if (form.invalid) {
      return;
    }

    this.userService.signIn(new Login(form.getRawValue())).pipe(
      tap(() => {
        this.router.navigate(['/']);
      }),
      catchError((err: AppError) => {
        this.notificationService.showAppError(err);

        return NEVER;
      }),
      takeUntilDestroy(this),
    ).subscribe();
  }
}
