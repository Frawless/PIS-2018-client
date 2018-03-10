import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import {ProductsRoutingModule} from './products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
  ],
  declarations: [
      ProductsComponent
  ]
})
export class ProductsModule { }

