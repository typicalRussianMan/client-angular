import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

const DEFAULT_HIDE_DELAY = 5000;

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private readonly snackBar = inject(MatSnackBar)

  public showMessage(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Hide', { duration: DEFAULT_HIDE_DELAY });
  }
}
