import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationErrorMapper } from 'src/app/core/models/validation-error/validation-error.mapper';
import { FlatControlsOf } from 'src/app/core/utils/forms/controls';

export abstract class AbstractFormComponent<T extends object> {

  protected abstract form: FormGroup<FlatControlsOf<T>>;

  private readonly errorMapper = inject(ValidationErrorMapper);

  /**
   * Returns validation error message of form control.
   * @param field Form control name.
   * @param args Arguments for validation error.
   */
  protected getError(
    field: keyof FormGroup<FlatControlsOf<T>>['controls'],
    ...args: any[]
  ): string {
    const { errors } = this.form.controls[field];

    const error = Object.keys(errors ?? {})[0];

    return this.errorMapper.mapErrorToMessage(error)(...args);
  }

  /**
   * Checks if form control has an error.
   * @param field Form control name.
   */
  protected hasError(field: keyof FormGroup<FlatControlsOf<T>>['controls']): boolean {
    return this.form.controls[field].invalid
  }
}
