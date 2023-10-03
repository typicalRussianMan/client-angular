import { Injectable } from '@angular/core';

import { IMapperFromDto } from '../mapper/mapper-from-dto';

import { UserDto } from './user.dto';
import { User } from './user';

/** User mapper. */
@Injectable({ providedIn: 'root' })
export class UserMapper implements IMapperFromDto<UserDto, User> {

  /** @inheritdoc */
  fromDto(dto: UserDto): User {
    return new User({
      email: dto.email,
      id: dto.id,
      name: dto.userName,
    });
  }
}
