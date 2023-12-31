import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, NEVER, catchError, of, switchMap, tap } from 'rxjs'
import { AppError } from 'src/app/core/models/app-error/app-error';
import { Rubric } from 'src/app/core/models/rubric/rubric';
import { trackById } from 'src/app/core/utils/angular/track-by';
import { Destroyable, takeUntilDestroy } from 'src/app/core/utils/destroyable';
import { NotificationService } from 'src/app/services/notification.service';
import { RubricService } from 'src/app/services/rubric.service';
import { UserService } from 'src/app/services/user.service';

@Destroyable()
@Component({
  selector: 'app-rubrics',
  templateUrl: './rubrics.component.html',
  styleUrls: ['./rubrics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RubricsComponent {

  private readonly updateRubricEffect$ = new BehaviorSubject<void>(void 0);

  /** Rubrics. */
  protected readonly rubrics$ = this.updateRubricEffect$.pipe(
    switchMap(() => this.rubricService.getRubrics()),
    catchError((e: AppError) => {
      this.notificationService.showAppError(e);
      this.userService.logout();
      return NEVER;
    })
  );

  public constructor(
    private readonly rubricService: RubricService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  protected trackByRubric = trackById<Rubric>();

  protected navigateToEdit(id: number): void {
    this.router.navigate(['admin','rubrics', 'edit', id]);
  }

  protected deleteRubric(rubric: Rubric): void {
    this.rubricService.deleteRubric(rubric)
      .pipe(
        tap(() => this.updateRubricEffect$.next(void 0)),
        catchError((err: AppError) => {
          this.notificationService.showAppError(err);

          return of(void 0);
        }),
        takeUntilDestroy(this),
      ).subscribe();
  }
}
