import { Injectable } from '@angular/core';

import { IMapperFromDto } from '../mapper/mapper-from-dto';

import { AppError } from './app-error';
import { AppErrorDto } from './app-error.dto';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppErrorMapper implements IMapperFromDto<AppErrorDto, AppError> {

  /** @inheritdoc */
  public fromDto(dto: AppErrorDto): AppError {
    return new AppError({
      message: dto.Message,
      statusCode: dto.StatusCode,
      title: dto.Title,
    });
  }

  /**
   * Maps http error response to App error.
   * @param error Http error response.
   */
  public fromHttpErrorResponse(error: HttpErrorResponse): AppError {
    return new AppError({
      message: error.message,
      statusCode: error.status,
      title: error.name
    })
  }
}
