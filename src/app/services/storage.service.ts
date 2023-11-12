import { Injectable } from '@angular/core';

/** Storage service. */
@Injectable({ providedIn: 'root' })
export class StorageService {

  /**
   * Gets a value from local storage.
   * @param key Key.
   */
  public getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }

  /**
   * Sets a value to local storage.
   * @param key Key.
   * @param value Value.
   */
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Removes item from local storage.
   * @param key Key.
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
