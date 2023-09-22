import { Injectable } from '@angular/core';

/** App config service. */
@Injectable({ providedIn: 'root' })
export class AppConfigService {

  public readonly apiUrl = 'https://prime-peaceful-buck.ngrok-free.app/';
}
