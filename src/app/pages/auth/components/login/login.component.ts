import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Login } from 'src/app/core/models/login/login';
import { ValidationErrorCode, ValidationErrorMapper } from 'src/app/core/models/validation-error/validation-error.mapper';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { FlatControlsOf } from 'src/app/core/utils/forms/controls';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

type AuthFormControls = FlatControlsOf<Login>;

/** Login component. */
@Destroyable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  protected readonly form = this.fb.group<AuthFormControls>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required),
  });

  public constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly userService: UserService,
    private readonly errorMapper: ValidationErrorMapper,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {}

  /**
   * Checks if form control has error.
   * @param field Form field key.
   */
  protected hasError(field: keyof AuthFormControls): boolean {
    return this.form.controls[field].invalid
  }

  /**
   * Extracts error from form.
   * @param field Form field key.
   */
  protected getError(field: keyof AuthFormControls): string | null {
    const { errors } = this.form.controls[field];

    const error = Object.keys(errors ?? {})[0];

    return this.errorMapper.mapErrorToMessage(error as ValidationErrorCode)()
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
      tap(user => {
        this.userService.currentUser$.next(user);
        this.router.navigate(['/'])
      }),
      catchError(e => {
        this.notificationService.showMessage(e.message);
        return of();
      }),
      takeUntilDestroy(this),
    ).subscribe();
  }
}
