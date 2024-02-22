import {Component, Input} from '@angular/core';
import {Product} from "../../../core/models/product.model";
import {ProductService} from "../../../core/services/product.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() index!: number;
  constructor(private productService:ProductService) {
  }

  addToCart($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.productService.addToCart( );
  }

  removeFromCart($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.productService.removeFromCart();
  }

}
