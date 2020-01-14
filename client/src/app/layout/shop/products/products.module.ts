import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductDetailModule} from '../../admin/products/detail/product-detail.module';
import {DetailComponent} from "./detail/detail.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
      ProductDetailModule
  ],
  declarations: [
      ProductsComponent,
      DetailComponent
  ]
})
export class ProductsModule { }

