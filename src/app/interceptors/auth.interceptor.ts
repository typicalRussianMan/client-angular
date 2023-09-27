import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly tokenService: TokenService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.tokenService.get();

    const authReq = token === null ?
      request :
      request.clone({
        headers: request.headers
          .set('Authorization', `Bearer ${token.access}`)
          .set('ngrok-skip-browser-warning', '*'),
      });

    return next.handle(authReq);
  }
}
