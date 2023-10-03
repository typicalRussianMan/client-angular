import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RubricMapper } from '../core/models/rubric/rubric.mapper';
import { UserService } from './user.service';
import { AppErrorMapper } from '../core/models/app-error/app-error.mapper';
import { AppConfigService } from './app-config.service';
import { Rubric, RubricBase } from '../core/models/rubric/rubric';
import { NEVER, Observable, catchError, map, throwError } from 'rxjs';
import { RubricDto } from '../core/models/rubric/rubric.dto';
import { isAppErrorDto } from '../core/models/app-error/app-error.dto';
import { CrudService } from '../core/utils/crud-service';

@Injectable({ providedIn: 'root' })
export class RubricService {

  private readonly rubricUrl: URL;

  private readonly rubricUrlWithId = (id: Rubric['id']) => `${this.rubricUrl}/${id}`

  public constructor(
    private readonly http: HttpClient,
    private readonly rubricMapper: RubricMapper,
    private readonly userService: UserService,
    private readonly errorMapper: AppErrorMapper,
    appConfig: AppConfigService,
  ) {
    this.rubricUrl = new URL('rubrics', appConfig.apiUrl);
  }

  /** Gets all rubrics. */
  public getRubrics(): Observable<readonly Rubric[]> {
    return this.http.get<readonly RubricDto[]>(this.rubricUrl.toString())
      .pipe(
        map(rubrics => rubrics.map(this.rubricMapper.fromDto)),
        catchError(() => {
          this.userService.logout();
          return NEVER;
        }),
      );
  }

  /**
   * Creates new rubric.
   * @param rubric Rubric.
   */
  public createRubric(rubric: RubricBase): Observable<void> {
    return this.http.post(
      this.rubricUrl.toString(),
      this.rubricMapper.toDto(rubric),
    ).pipe(
      map(() => void 0),
      catchError(err => {
        if (isAppErrorDto(err)) {
          return throwError(this.errorMapper.fromDto(err))
        }

        return NEVER;
      })
    )
  }

  /**
   * Deletes rubric.
   * @param rubric Rubric.
   */
  public deleteRubric(rubric: Rubric): Observable<void> {
    return this.http.delete(
      this.rubricUrlWithId(rubric.id),
    ).pipe(
      map(() => void 0),
      catchError(err => {
        if (isAppErrorDto(err)) {
          return throwError(this.errorMapper.fromDto(err))
        }

        return NEVER;
      })
    )
  }

  /**
   * Edit rubric.
   * @param rubric Rubric.
   */
  public editRubric(rubric: Rubric): Observable<void> {
    return this.http.patch(
      this.rubricUrlWithId(rubric.id),
      this.rubricMapper.toDto(rubric)
    ).pipe(
      map(() => void 0),
      catchError(err => {
        if (isAppErrorDto(err)) {
          return throwError(this.errorMapper.fromDto(err))
        }

        return NEVER;
      })
    )
  }
}
