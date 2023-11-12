import { Directive } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AbstractFormComponent } from "src/app/components/abstract-form/abstract-form.component";
import { Login } from "src/app/core/models/login/login";
import { FlatControlsOf } from "src/app/core/utils/forms/controls";
import { NotificationService } from "src/app/services/notification.service";
import { UserService } from "src/app/services/user.service";

type AuthFormControls = FlatControlsOf<Login>;

@Directive()
export abstract class AbstractAuthComponent extends AbstractFormComponent<Login> {

  protected override form = this.fb.group<AuthFormControls>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required),
  });

  public constructor(
    protected readonly fb: NonNullableFormBuilder,
    protected readonly userService: UserService,
    protected readonly notificationService: NotificationService,
    protected readonly router: Router,
  ) {
    super();
  }

  protected onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.onValidFormSubmit();
  }

  protected abstract onValidFormSubmit(): void;
}
