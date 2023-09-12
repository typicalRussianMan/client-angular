import { Injectable } from '@angular/core';

/** Validation error code. */
export enum ValidationErrorCode {
  Required = 'required',
  MinLength = 'minlength',
  Email = 'email',
}

const MAP_ERROR_CODE_TO_MESSAGE: Readonly<Record<ValidationErrorCode, (...args: any) => string>> = {
  [ValidationErrorCode.Email]: () => 'This field should be email',
  [ValidationErrorCode.MinLength]: (length: number) => `This field should have length ${length}`,
  [ValidationErrorCode.Required]: () => 'This field is required',
}

/** Validation error mapper. */
@Injectable({ providedIn: 'root' })
export class ValidationErrorMapper {

  /**
   * Maps error code to error message.
   * @param errorCode
   */
  public mapErrorToMessage(errorCode: ValidationErrorCode): (...args: any) => string {
    return MAP_ERROR_CODE_TO_MESSAGE[errorCode] ?? (() => 'Unknown error');
  }
}
