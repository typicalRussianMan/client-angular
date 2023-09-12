import { Injectable } from '@angular/core';
import { Observable, first, map } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  public constructor(
    private readonly userService: UserService,
  ) {}

  public canActivate(): Observable<boolean> {
    return this.userService.currentUser$.pipe(
      map(user => {
        const canActivate = user !== null;

        if (!canActivate) {
          this.userService.requireLogin();
        }

        return canActivate;
      } ),
    )
  }
}
