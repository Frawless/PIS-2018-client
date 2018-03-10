import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin.products.component';
import { AdminProductsRoutingModule } from './admin.products-routing.module';
import { ProductNewComponent } from './new/product-new.component';
import { FormsModule } from '@angular/forms';
import {ProductDetailComponent} from "./detail/product-detail.component";

@NgModule({
  imports: [
    CommonModule,
    AdminProductsRoutingModule,
    FormsModule
  ],
  declarations: [
      AdminProductsComponent,
      ProductNewComponent,
      ProductDetailComponent
  ]
})
export class AdminProductsModule { }

