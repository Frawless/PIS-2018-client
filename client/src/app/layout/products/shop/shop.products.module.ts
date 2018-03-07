import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopProductsComponent } from './shop.products.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent} from '../detail/product-detail.component';
import {ShopProductsRoutingModule} from './shop.products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShopProductsRoutingModule,
  ],
  declarations: [
      ShopProductsComponent,
      ProductDetailComponent
  ]
})
export class ShopProductsModule { }

