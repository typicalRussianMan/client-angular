import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/core/models/login/login';
import { ValidationErrorCode, ValidationErrorMapper } from 'src/app/core/models/validation-error/validation-error.mapper';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { tap, catchError, of } from 'rxjs'
import { FlatControlsOf } from 'src/app/core/utils/forms/controls';
import { Router } from '@angular/router';

type RegisterFormControls = FlatControlsOf<Login>;

@Destroyable()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public readonly form = this.fb.group<RegisterFormControls>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required),
  });

  public constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly userService: UserService,
    private readonly errorMapper: ValidationErrorMapper,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  public hasError(field: keyof RegisterFormControls): boolean {
    return this.form.controls[field].invalid
  }

  public getError(field: keyof RegisterFormControls): string | null {
    const { errors } = this.form.controls[field];

    const error = Object.keys(errors ?? {})[0];

    return this.errorMapper.mapErrorToMessage(error as ValidationErrorCode)()
  }

  public onSubmit(form: FormGroup): void {
    form.markAsTouched();

    if (form.invalid) {
      return;
    }

    this.userService.register(new Login(form.getRawValue())).pipe(
      tap(user => {
        this.userService.currentUser$.next(user);
        this.router.navigate(['/'])
      }),
      catchError(e => {
        this.notificationService.showMessage(e.message)
        return of();
      }),
      takeUntilDestroy(this),
    ).subscribe();
  }
}
