import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  public constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  /** Checks if user is authorized. */
  public canActivate(): Observable<boolean> {
    const token = this.tokenService.get();

    if (token === null) {
      return of(false);
    }

    return this.userService.verifyToken(token).pipe(
      tap(isValid => {
        if (!isValid) {
          this.userService.requireLogin();
        }
      }),
    )
  }
}
