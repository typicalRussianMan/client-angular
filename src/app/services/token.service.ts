import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Token } from "../core/models/token/token";

const TOKEN_STORAGE_KEY = '__token__';

@Injectable({ providedIn: 'root' })
export class TokenService {

  public constructor(
    private readonly storageService: StorageService,
  ) {}

  public hasToken(): boolean {
    return this.storageService.getItem(TOKEN_STORAGE_KEY) !== null;
  }

  public remove(): void {
    this.storageService.removeItem(TOKEN_STORAGE_KEY);
  }

  public set(value: Token): void {
    this.storageService.setItem(TOKEN_STORAGE_KEY, value);
  }

  public get(): Token | null {
    return this.storageService.getItem(TOKEN_STORAGE_KEY);
  }
}
