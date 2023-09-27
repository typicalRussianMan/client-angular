import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  public constructor(
    private readonly userService: UserService,
  ) {}

  /** Checks if user is authorized. */
  public canActivate(): Observable<boolean> {
    return this.userService.isAuthorized$.pipe(
      map(isAuthorized => {

        if (!isAuthorized) {
          this.userService.requireLogin();
        }

        return isAuthorized;
      } ),
    )
  }
}
