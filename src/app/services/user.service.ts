import { Injectable } from '@angular/core';
import { Login } from 'src/app/core/models/login/login';
import { BehaviorSubject, Observable, tap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { LoginMapper } from '../core/models/login/login.mapper';
import { Token } from '@angular/compiler';
import { TokenMapper } from '../core/models/token/token.mapper';
import { TokenDto } from '../core/models/token/token.dto';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';
import { AppErrorDto } from '../core/models/app-error/app-error.dto';
import { TokenService } from './token.service';


@Injectable({ providedIn: 'root' })
export class UserService {

  /** Is user authorized. */
  public readonly isAuthorized$ = new BehaviorSubject(false);

  private readonly loginUrl: URL;

  public constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly loginMapper: LoginMapper,
    private readonly tokenMapper: TokenMapper,
    private readonly tokenService: TokenService,
    private readonly notificationService: NotificationService,
    config: AppConfigService,
  ) {
    if (this.tokenService.hasToken()) {
      this.isAuthorized$.next(true);
    }
    
    this.loginUrl = new URL('auth/login', config.apiUrl);
  }

  /**
   * Logins user.
   * @param login Login data.
   */
  public signIn(login: Login): Observable<boolean> {
    return this.http.post<TokenDto>(
      this.loginUrl.toString(),
      this.loginMapper.toDto(login),
    ).pipe(
      map(token => this.tokenMapper.fromDto(token)),
      tap(token => this.tokenService.set(token)),
      map(() => true),
      catchError((err: AppErrorDto) => {
        this.notificationService.showMessage(err.Message);
        return of(false);
      })
    );
  }

  public logout(): void {
    this.isAuthorized$.next(false);
    this.tokenService.remove();
  }

  /** Redirects user to login page. */
  public requireLogin(): void {
    this.router.navigate(['/auth'])
  }
}
