import { Injectable } from "@angular/core";
import { createUserWithEmailAndPassword, UserCredential, AdditionalUserInfo } from 'firebase/auth'
import { Login } from "src/app/core/models/login/login";
import { FirebaseService } from "./firebase.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

  public constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  public async createUser(login: Login): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.firebaseService.auth,
      login.email,
      login.password,
    )
  }
}
