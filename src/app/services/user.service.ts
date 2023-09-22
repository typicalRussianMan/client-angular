import { Injectable } from '@angular/core';
import { Login } from 'src/app/core/models/login/login';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { LoginMapper } from '../core/models/login/login.mapper';

@Injectable({ providedIn: 'root' })
export class UserService {

  /** Current user. */
  public readonly currentUser$ = new BehaviorSubject<null>(null)

  private readonly loginUrl: URL;

  public constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly loginMapper: LoginMapper,
    config: AppConfigService,
  ) {
    this.loginUrl = new URL('Auth/login', config.apiUrl);
  }

  /**
   * Logins user.
   * @param login Login data.
   */
  public signIn(login: Login): Observable<any> {
    console.log(this.loginUrl.toString())
    return this.http.post(
      this.loginUrl.toString(),
      this.loginMapper.toDto(login)
    ).pipe(
      tap(console.log)
    );
  }

  /** Redirects user to login page. */
  public requireLogin(): void {
    this.router.navigate(['/auth'])
  }
}
