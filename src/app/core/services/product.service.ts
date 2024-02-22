import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CachedDataService } from "./cach/cached-data.service";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private cacheService: CachedDataService) {}
  private cartItemCount = new BehaviorSubject<number>(0);

  getProducts(limit: number): Observable<Product[]> {
    const endpoint = `/products?limit=${limit}`;
    const cacheKey = `products-limit-${limit}-size`;
    const cachedData = this.cacheService.get(cacheKey);

    if (cachedData) {
      return of(cachedData as Product[]);
    }

    return this.http.get<Product[]>(endpoint).pipe(
      tap(data => this.cacheService.set(cacheKey, data)),
      map(data => data),
      catchError(this.handleError('getProducts', []))
    );
  }

  getProductDetails(id: number): Observable<any> {
    const endpoint = `/products/${id}`;
    return this.http.get<any>(endpoint).pipe(
      map(data => data),
      catchError(this.handleError('getProducts', {}))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addToCart() {
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  removeFromCart() {
    if (this.cartItemCount.value > 0) {
      this.cartItemCount.next(this.cartItemCount.value - 1);
    }
  }
}
