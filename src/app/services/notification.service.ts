import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppError } from '../core/models/app-error/app-error';

const DEFAULT_HIDE_DELAY = 5000;

/** Notification service. */
@Injectable({ providedIn: 'root' })
export class NotificationService {

  private readonly snackBar = inject(MatSnackBar);

  /**
   * Shows snackbar with message.
   * @param message Message.
   */
  public showMessage(message: string): void {
    this.snackBar.open(message, 'Hide', { duration: DEFAULT_HIDE_DELAY });
  }

  /**
   * Shows app error message.
   * @param error App error.
   */
  public showAppError(error: AppError): void {
    this.showMessage(error.message);
  }
}
