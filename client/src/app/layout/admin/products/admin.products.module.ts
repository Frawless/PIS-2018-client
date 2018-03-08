import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin.products.component';
import { AdminProductsRoutingModule } from './admin.products-routing.module';
import { ProductNewComponent } from './new/product-new.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminProductsRoutingModule,
    FormsModule
  ],
  declarations: [
      AdminProductsComponent,
      ProductNewComponent
  ]
})
export class AdminProductsModule { }

