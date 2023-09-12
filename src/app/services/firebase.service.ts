import { Injectable, inject } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class FirebaseService {

  private readonly app: FirebaseApp;

  private readonly appConfig = inject(AppConfigService);

  /** Firestore. */
  public readonly firestore: Firestore;

  /** Firebase Authentication. */
  public readonly auth: Auth;

  public constructor() {
    this.app = initializeApp(this.appConfig.firebaseConfig);
    this.firestore = getFirestore(this.app);

    this.auth = getAuth(this.app);
  }
}
