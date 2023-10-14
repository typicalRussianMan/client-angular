import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

import { IMapperFromDto } from '../mapper/mapper-from-dto';
import { IMapperToDto } from '../mapper/mapper-to-dto';

import { Blog, BlogBase, BlogToCreate } from './blog';
import { BlogBaseDto, BlogToCreateDto, BlogDto } from './blog.dto';
import { TagMapper } from '../tag/tag.mapper';

/** Blog mapper. */
@Injectable({ providedIn: 'root' })
export class BlogMapper implements
  IMapperFromDto<BlogDto, Blog>,
  IMapperToDto<BlogToCreateDto, BlogToCreate>
{

  public constructor(
    private readonly tagMapper: TagMapper,
  ) {}

  /** @inheritdoc */
  public fromDto(dto: BlogDto): Blog {
    return new Blog({
      authorName: dto.userName,
      content: dto.content,
      createdAt: DateTime.fromISO(dto.createdAt),
      id: dto.id,
      title: dto.title,
      rubric: dto.rubric,
      tags: dto.tags.map(tag => this.tagMapper.fromDto(tag)),
    });
  }

  /** @inheritdoc */
  public toDto(model: BlogToCreate): BlogToCreateDto {
    return {
      content: model.content,
      title: model.title,
      rubric: model.rubric,
      tags: model.tags,
    };
  }
}
