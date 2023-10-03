import { Injectable } from '@angular/core';

import { IMapperToDto } from '../mapper/mapper-to-dto';

import { Login } from './login';
import { LoginDto } from './login.dto';

/** Login mapper. */
@Injectable({ providedIn: 'root' })
export class LoginMapper implements IMapperToDto<LoginDto, Login> {

  /** @inheritdoc */
  public toDto(model: Login): LoginDto {
    return {
      email: model.email,
      password: model.password,
    };
  }
}
