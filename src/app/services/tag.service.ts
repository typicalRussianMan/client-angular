import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { TagMapper } from '../core/models/tag/tag.mapper';
import { CrudService } from '../core/utils/crud-service';
import { TagDto } from '../core/models/tag/tag.dto';
import { Tag } from '../core/models/tag/tag';

/** Tag service. */
@Injectable({ providedIn: 'root' })
export class TagService extends CrudService<TagDto, {}>('tags') {

  public constructor(
    private readonly tagMapper: TagMapper,
  ) {
    super();
  }

  /** Gets all tags. */
  public getTags(): Observable<readonly Tag[]> {
    return this.getAll().pipe(
      map(tags => tags.map(tag => this.tagMapper.fromDto(tag))),
    );
  }
}
