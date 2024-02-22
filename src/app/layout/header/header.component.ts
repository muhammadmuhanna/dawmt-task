import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import * as SearchActions from '../../core/store/actions/search.actions';
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {ProductService} from "../../core/services/product.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private searchInputSubject = new Subject<string>();
  cartItemCount = 0;
  constructor(private store: Store,private router: Router,private prductService:ProductService) {}
  ngOnInit() {
    this.prductService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
    this.searchInputSubject.pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.onSearch(value);
    });



   }
  ngOnDestroy() {
    this.searchInputSubject.unsubscribe();
  }

  onSearch(value: string) {
     this.store.dispatch(SearchActions.setSearchValue({ value }));
  }

  onKeyUp(value: string) {
    this.searchInputSubject.next(value);
  }

  hiddenInput(): boolean {
    const ProductDetailsRegex = /^\/product\/[\w-]+$/;
    return ProductDetailsRegex.test(this.router.url);
   }
}
