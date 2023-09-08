import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Login } from "src/app/core/models/login/login";
import { Observable } from "rxjs";
import { UserCredential } from "firebase/auth";

@Injectable({ providedIn: 'root' })
export class UserService {

  public constructor(
    private readonly authService: AuthService,
  ) {}

  public logIn(login: Login): Observable<UserCredential> {
    return new Observable((sub) => {
      this.authService.createUser(login)
        .then(value => sub.next(value))
        .catch(err => sub.error(err))
        .finally(() => sub.complete());
    });
  }
}
