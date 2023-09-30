import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, NEVER, catchError, map, switchMap, tap } from 'rxjs'
import { AppError } from 'src/app/core/models/app-error/app-error';
import { Rubric } from 'src/app/core/models/rubric/rubric';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { NotificationService } from 'src/app/services/notification.service';
import { RubricService } from 'src/app/services/rubric.service';

@Destroyable()
@Component({
  selector: 'app-rubrics',
  templateUrl: './rubrics.component.html',
  styleUrls: ['./rubrics.component.css']
})
export class RubricsComponent {

  private updateRubricEffect$ = new BehaviorSubject<void>(void 0);

  /** Rubrics. */
  protected rubrics$ = this.updateRubricEffect$.pipe(
    switchMap(() => this.rubricService.getRubrics()),
  );

  public constructor(
    private readonly rubricService: RubricService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
  ) {}

  protected trackByRubric(_index: number, rubric: Rubric): Rubric['id'] {
    return rubric.id;
  }

  protected navigateToEdit(id: number): void {
    this.router.navigate(['admin','rubrics', 'edit', id]);
  }

  protected deleteRubric(rubric: Rubric): void {
    this.rubricService.deleteRubric(rubric)
      .pipe(
        tap(() => this.updateRubricEffect$.next(void 0)),
        catchError((err: AppError) => {
          this.notificationService.showAppError(err);

          return NEVER;
        }),
        takeUntilDestroy(this),
      ).subscribe();
  }
}
