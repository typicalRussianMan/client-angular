import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { RubricMapper } from '../core/models/rubric/rubric.mapper';
import { AppErrorMapper } from '../core/models/app-error/app-error.mapper';
import { Rubric, RubricBase } from '../core/models/rubric/rubric';
import { RubricBaseDto, RubricDto } from '../core/models/rubric/rubric.dto';
import { CrudService } from '../core/utils/crud-service';

import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class RubricService extends CrudService<RubricDto, RubricBaseDto>('rubrics') {

  public constructor(
    private readonly rubricMapper: RubricMapper,
    http: HttpClient,
    errorMapper: AppErrorMapper,
    appConfig: AppConfigService,
  ) {
    super(http, errorMapper, appConfig);
  }

  /** Gets all rubrics. */
  public getRubrics(): Observable<readonly Rubric[]> {
    return this.getAll()
      .pipe(
        map(rubrics => rubrics.map(this.rubricMapper.fromDto)),
      );
  }

  /**
   * Creates new rubric.
   * @param rubric Rubric.
   */
  public createRubric(rubric: RubricBase): Observable<void> {
    return this.create(this.rubricMapper.toDto(rubric));
  }

  /**
   * Deletes rubric.
   * @param rubric Rubric.
   */
  public deleteRubric(rubric: Rubric): Observable<void> {
    return this.delete(rubric.id);
  }

  /**
   * Edit rubric.
   * @param rubric Rubric.
   */
  public editRubric(rubric: Rubric): Observable<void> {
    return this.update(rubric.id, this.rubricMapper.toDto(rubric));
  }
}
