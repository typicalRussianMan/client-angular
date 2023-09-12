import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/core/models/login/login';
import { FlatControlsOf } from 'src/app/core/utils/forms/controls';
import { UserService } from '../../services/user.service';
import { first, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

type AuthFormControls = FlatControlsOf<Login>;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {

  public readonly form = this.fb.group<AuthFormControls>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required),
  });

  public constructor(
    private readonly fb: NonNullableFormBuilder,
  ) {}

  public onSubmit(form: FormGroup): void {
    form.markAsTouched();

    if (form.invalid) {
      return;
    }
  }
}
