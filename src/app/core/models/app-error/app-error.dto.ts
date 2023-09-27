/** App error DTO. */
export interface AppErrorDto {

  /** Message. */
  readonly Message: string;

  /** Status code. */
  readonly StatusCode: number;

  /** Title. */
  readonly Title: string;
}

const appErrorKeys: readonly (keyof AppErrorDto)[] = ['Message', 'StatusCode', 'Title'];

/**
 * Checks if value is AppErrorDto.
 * @param value Value.
 */
export function isAppErrorDto(value: any): value is AppErrorDto {
  if (typeof value !== 'object') {
    return false;
  }

  const keys = Object.keys(value);

  return appErrorKeys.every(key => keys.includes(key));
}
