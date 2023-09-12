import { Injectable } from '@angular/core';

/** App config service. */
@Injectable({ providedIn: 'root' })
export class AppConfigService {

  /** Firebase config. */
  public readonly firebaseConfig = {
    apiKey: 'AIzaSyAgeBHOW6UzOlPRS2T2RMoNrfO4imoLuOU',
    authDomain: 'univer-server.firebaseapp.com',
    projectId: 'univer-server',
    storageBucket: 'univer-server.appspot.com',
    messagingSenderId: '612854519274',
    appId: '1:612854519274:web:96215f332cddefbe208e93'
  };
}
