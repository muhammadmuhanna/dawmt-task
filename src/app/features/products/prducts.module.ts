import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {MatCardModule} from "@angular/material/card";
import {CoreModule} from "../../core/core.module";
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductCardComponent,
    ProductDetailComponent,

  ],
  exports: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ProductsRoutingModule,
    MatCardModule,
    CoreModule,
    MatProgressBarModule

  ]
})
export class PrductsModule { }
