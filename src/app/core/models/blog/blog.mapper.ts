import { Injectable } from '@angular/core';
import { IMapper } from "../mapper/mapper";
import { Blog, BlogBase } from "./blog";
import { BlogBaseDto, BlogDto } from "./blog.dto";
import { DateTime } from 'luxon';
import { IMapperFromDto } from '../mapper/mapper-from-dto';
import { IMapperToDto } from '../mapper/mapper-to-dto';

/** Blog mapper. */
@Injectable({ providedIn: 'root' })
export class BlogMapper implements
  IMapperFromDto<BlogDto, Blog>,
  IMapperToDto<BlogBase, BlogBaseDto>
{

  /** @inheritdoc */
  public fromDto(dto: BlogDto): Blog {
    return new Blog({
      authorName: dto.authorName,
      content: dto.content,
      createdAt: DateTime.fromISO(dto.createdAt),
      id: dto.id,
      title: dto.title,
    });
  }

  /** @inheritdoc */
  public toDto(model: BlogBase): BlogBaseDto {
    return {
      content: model.content,
      title: model.title,
    };
  }
}