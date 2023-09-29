import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Token } from "../core/models/token/token";
import { BehaviorSubject, Observable, catchError, map, of } from "rxjs";
import { AppConfigService } from "./app-config.service";
import { HttpClient } from "@angular/common/http";
import { TokenMapper } from "../core/models/token/token.mapper";

const TOKEN_STORAGE_KEY = '__token__';

@Injectable({ providedIn: 'root' })
export class TokenService {

  private readonly tokenValue$ = new BehaviorSubject<Token | null>(this.get());

  /** Token. */
  public readonly token$ = this.tokenValue$.asObservable();

  public constructor(
    private readonly storageService: StorageService,
  ) {}

  /** Checks if token store in storage. */
  public hasToken(): boolean {
    return this.storageService.getItem(TOKEN_STORAGE_KEY) !== null;
  }

  /** Removes token from storage. */
  public remove(): void {
    this.tokenValue$.next(null);
    this.storageService.removeItem(TOKEN_STORAGE_KEY);
  }

  /** Sets token to storage. */
  public set(value: Token): void {
    this.tokenValue$.next(value);
    this.storageService.setItem(TOKEN_STORAGE_KEY, value);
  }

  /** Gets token from storage. */
  public get(): Token | null {
    return this.storageService.getItem(TOKEN_STORAGE_KEY);
  }
}
