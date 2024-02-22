import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {ProductService} from "../../../core/services/product.service";
import { Product } from '../../../core/models/product.model';
import { Store } from '@ngrx/store';
import { selectSearchValue } from '../../../core/store/selectors/search.selectors';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../../../core/store/reducers';
import { NavigationEnd, Router } from '@angular/router';
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  totalProducts = 0;
  pageSize = 5;
  currentPage = 1;
  products: Product[] = [];
  isLoading = true;
  searchValue: string = '';
  private navigationSubscription!: Subscription;
  private searchSubscription!: Subscription;

  constructor(private productService: ProductService,
              private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
     this.setupNavigationSubscription();
    this.setupSearchSubscription();
    this.loadData(this.pageSize);
  }

  private setupNavigationSubscription() {
    this.navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.resetSearchValue());
  }

  private setupSearchSubscription() {
    this.searchSubscription = this.store.select(selectSearchValue).subscribe(value => {
      this.searchValue = value;
       if (value) this.products =  this.filterProducts(value);
    });
  }

  resetSearchValue() {
    this.searchValue = '';
  }

  ngOnDestroy() {
    this.navigationSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData(this.currentPage);
  }

  loadData(limit: number): void {
    this.isLoading = true;
    this.productService.getProducts(limit).subscribe(data => {
      this.products = data;
      this.isLoading = false;
    }, error => {
      console.error('Failed to load products', error);
      this.isLoading = false;
    });
  }
  filterProducts(title:any) {
    return this.products.filter(product => product.title.toLowerCase() === title.toLowerCase());
  }
  goToProductDetail(productId: any): void {
    this.router.navigate(['/products', productId]);
  }
}
