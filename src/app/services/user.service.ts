import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Login } from 'src/app/core/models/login/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCredential } from 'firebase/auth';
import { fromPromise } from '../core/utils/rxjs/from-promise';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {

  /** Current user. */
  public readonly currentUser$ = new BehaviorSubject<UserCredential | null>(null)

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /**
   * Registers user.
   * @param login Login data.
   */
  public register(login: Login): Observable<UserCredential> {
    return fromPromise(this.authService.register(login))
  }

  /**
   * Logins user.
   * @param login Login data.
   */
  public signIn(login: Login): Observable<UserCredential> {
    return fromPromise(this.authService.singIn(login))
  }

  /** Redirects user to login page. */
  public requireLogin(): void {
    this.router.navigate(['/auth'])
  }
}
