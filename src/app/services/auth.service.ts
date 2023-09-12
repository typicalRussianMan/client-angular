import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword } from 'firebase/auth'
import { Login } from 'src/app/core/models/login/login';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  /**
   * Registers user.
   * @param login Login data.
   */
  public async register(login: Login): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.firebaseService.auth,
      login.email,
      login.password,
    )
  }

  /**
   * Logins user.
   * @param login Login data.
   */
  public async singIn(login: Login): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.firebaseService.auth,
      login.email,
      login.password,
    )
  }
}
