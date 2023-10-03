import { Injectable } from "@angular/core";
import { AppConfigService } from "./app-config.service";

@Injectable({ providedIn: 'root' })
export class UrlConfigService {

  public readonly blogU

  public constructor(
    private readonly appConfig: AppConfigService,
  ) {}
}
