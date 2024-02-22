import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachedDataService {

  private cache = new Map<string, { data: any, expiration: number }>();
  private defaultExpiration = 60000;
  constructor() {}
  set(key: string, data: any, ttl?: number): void {
    const expiration = Date.now() + (ttl || this.defaultExpiration);
    this.cache.set(key, { data: JSON.stringify(data), expiration });
    setTimeout(() => this.invalidate(key), ttl || this.defaultExpiration);
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiration) {
      this.invalidate(key);
      return null;
    }
    return JSON.parse(item.data);
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }
}
