import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Login } from 'src/app/core/models/login/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCredential } from 'firebase/auth';
import { fromPromise } from '../core/utils/rxjs/from-promise';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {

  public readonly currentUser$ = new BehaviorSubject<UserCredential | null>(null)

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  public register(login: Login): Observable<UserCredential> {
    return fromPromise(this.authService.register(login))
  }

  public signIn(login: Login): Observable<UserCredential> {
    return fromPromise(this.authService.singIn(login))
  }

  public requireLogin(): void {
    this.router.navigate(['/auth'])
  }
}
