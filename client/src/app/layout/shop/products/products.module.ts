import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent} from '../../admin/products/detail/product-detail.component';
import {ProductsRoutingModule} from './products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
  ],
  declarations: [
      ProductsComponent,
      ProductDetailComponent
  ]
})
export class ProductsModule { }

