import { Injectable } from '@angular/core';
import { Login } from 'src/app/core/models/login/login';
import { Observable, tap, map, catchError, of, switchMap, throwError, NEVER } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { LoginMapper } from '../core/models/login/login.mapper';
import { TokenMapper } from '../core/models/token/token.mapper';
import { TokenDto } from '../core/models/token/token.dto';
import { isAppErrorDto } from '../core/models/app-error/app-error.dto';
import { TokenService } from './token.service';
import { Token } from '../core/models/token/token';
import { User } from '../core/models/user/user';
import { UserDto } from '../core/models/user/user.dto';
import { UserMapper } from '../core/models/user/user.mapper';
import { AppErrorMapper } from '../core/models/app-error/app-error.mapper';


@Injectable({ providedIn: 'root' })
export class UserService {

  public readonly currentUser$: Observable<User | null>;

  private readonly loginUrl: URL;

  private readonly verifyTokenUrl: URL;

  private readonly userUrl: URL;

  public constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly loginMapper: LoginMapper,
    private readonly tokenMapper: TokenMapper,
    private readonly tokenService: TokenService,
    private readonly userMapper: UserMapper,
    private readonly appErrorMapper: AppErrorMapper,
    config: AppConfigService,
  ) {
    this.loginUrl = new URL('auth/login', config.apiUrl);
    this.verifyTokenUrl = new URL('auth/token/verify', config.apiUrl);
    this.userUrl = new URL('auth/user', config.apiUrl);

    this.currentUser$ = this.initCurrentUser();
  }

  private initCurrentUser(): Observable<User | null> {
    return this.tokenService.token$.pipe(
      switchMap(token => {
        if (token === null) {
          return of(null);
        }

        return this.getUser();
      })
    )
  }

  private getUser(): Observable<User | null> {
    return this.http.get<UserDto>(this.userUrl.toString())
      .pipe(
        map(this.userMapper.fromDto),
        tap(console.log),
        catchError(e => {
          this.logout();
          return of(null);
        }),
      );
  }

  /**
   * Logins user.
   * @param login Login data.
   */
  public signIn(login: Login): Observable<void> {
    return this.http.post<TokenDto>(
      this.loginUrl.toString(),
      this.loginMapper.toDto(login),
    ).pipe(
      map(token => this.tokenMapper.fromDto(token)),
      tap(token => this.tokenService.set(token)),
      map(() => void 0),
      catchError(err => {
        if (isAppErrorDto(err)) {
          return throwError(this.appErrorMapper.fromDto(err));
        }

        return NEVER;
      })
    );
  }

  /** Logouts user. */
  public logout(): void {
    this.tokenService.remove();
    this.requireLogin();
  }

  /** Redirects user to login page. */
  public requireLogin(): void {
    this.router.navigate(['/auth'])
  }

  /**
   * Checks if token valid.
   * @param token Token.
   */
  public verifyToken(token: Token): Observable<boolean> {
    return this.http.post(this.verifyTokenUrl.toString(), { token: token.access })
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
