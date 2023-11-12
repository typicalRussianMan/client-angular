import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractAuthComponent } from '../admin-auth/abstract-auth.component';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Login } from 'src/app/core/models/login/login';
import { AppError } from 'src/app/core/models/app-error/app-error';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';

@Destroyable()
@Component({
  selector: 'app-web-auth',
  templateUrl: './web-auth.component.html',
  styleUrls: ['../../auth.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebAuthComponent extends AbstractAuthComponent {

  protected readonly isLoading$ = new BehaviorSubject(false);

  protected override onValidFormSubmit(): void {
    this.isLoading$.next(true);
    this.userService.signIn(new Login(this.form.getRawValue())).pipe(
      tap(() => {
        this.router.navigate(['/']);
      }),
      catchError((err: AppError) => {
        this.notificationService.showAppError(err);
        return of(undefined);
      }),
      tap(() => this.isLoading$.next(false)),
      takeUntilDestroy(this),
    )
      .subscribe();
  }

  protected insertCredentials(): void {
    this.form.patchValue({
      email: 'qwe123qwe@mail.ru',
      password: 'Q-we123qwe',
    })
  }
}
