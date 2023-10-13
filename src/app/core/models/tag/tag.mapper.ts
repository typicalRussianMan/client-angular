import { Injectable } from '@angular/core';
import { IMapperFromDto } from '../mapper/mapper-from-dto';
import { Tag } from './tag';
import { TagDto } from './tag.dto';

/** Tag mapper. */
@Injectable({ providedIn: 'root' })
export class TagMapper implements IMapperFromDto<TagDto, Tag> {

  /** @inheritdoc */
  public fromDto(dto: TagDto): Tag {
    return new Tag({ name: dto.name });
  }
}
