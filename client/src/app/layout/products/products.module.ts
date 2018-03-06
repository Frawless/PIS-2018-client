import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent} from './detail/product-detail.component';
import { ProductNewComponent } from './new/product-new.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule
  ],
  declarations: [
      ProductsComponent,
      ProductDetailComponent,
      ProductNewComponent
  ]
})
export class ProductsModule { }

