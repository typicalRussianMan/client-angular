import { Injectable } from '@angular/core';
import { IMapper } from "../mapper/mapper";
import { Blog } from "./blog";
import { BlogDto } from "./blog.dto";
import { DateTime } from 'luxon';

/** Blog mapper. */
@Injectable({ providedIn: 'root' })
export class BlogMapper implements IMapper<BlogDto, Blog> {

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
  public toDto(model: Blog): BlogDto {
    return {
      authorName: model.authorName,
      content: model.content,
      createdAt: model.createdAt.toString(),
      id: model.id,
      title: model.title,
    };
  }
}
