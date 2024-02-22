import { Component } from '@angular/core';
import {Product} from "../../../core/models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../core/services/product.service";
import * as SearchActions from "../../../core/store/actions/search.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: Product | undefined;
  isLoading = false
  constructor(
    private route: ActivatedRoute,
    private store:Store,
    private router:Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const prductId = +params.get('id')!;
      this.loadProductDetail(prductId);
    });
  }
  getStarClass(rate: number, index: number): string {
    if (rate >= index + 1) {
      return 'fas fa-star';
    } else if (rate > index && rate < index + 1) {
      return 'fas fa-star-half-alt';
    } else {
      return 'far fa-star';
    }
  }
  loadProductDetail(productId: number): void {
    this.isLoading = true
    this.productService.getProductDetails(productId).subscribe(
      (productData: any) => {
        this.product = productData;
        console.log(this.product)
        this.isLoading = false
        },
      error => {
        console.error('Failed to load product details', error);
        this.isLoading = false
      }
    );
  }

  reset() {
    this.store.dispatch(SearchActions.setSearchValue({ value: '' }));
    this.router.navigate(['/']);
  }
}
