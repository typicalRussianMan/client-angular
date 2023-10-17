import { Injectable } from '@angular/core';

import { IMapperFromDto } from '../mapper/mapper-from-dto';

import { UserDto } from './user.dto';
import { User } from './user';
import { BlogMapper } from '../blog/blog.mapper';

/** User mapper. */
@Injectable({ providedIn: 'root' })
export class UserMapper implements IMapperFromDto<UserDto, User> {

  public constructor(
    private readonly blogMapper: BlogMapper,
  ) {
    this.fromDto = this.fromDto.bind(this);
  }

  /** @inheritdoc */
  fromDto(dto: UserDto): User {
    return new User({
      email: dto.email,
      id: dto.id,
      name: dto.userName,
      blogs: dto.blogs.map(blog => this.blogMapper.fromDto(blog)),
    });
  }
}
