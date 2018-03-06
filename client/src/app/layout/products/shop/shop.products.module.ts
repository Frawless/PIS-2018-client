import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopProductsComponent } from './shop.products.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
      ShopProductsComponent,
  ]
})
export class ShopProductsModule { }

