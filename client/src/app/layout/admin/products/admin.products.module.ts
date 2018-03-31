import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './admin.products.component';
import { AdminProductsRoutingModule } from './admin.products-routing.module';
import { ProductNewComponent } from './new/product-new.component';
import { FormsModule } from '@angular/forms';
import {ProductDetailModule} from './detail/product-detail.module';
import {MtImagePreviewComponentModule} from '../../components/image-preview/image-preview.module';

@NgModule({
  imports: [
    CommonModule,
    AdminProductsRoutingModule,
    FormsModule,
      ProductDetailModule,
      MtImagePreviewComponentModule

  ],
  declarations: [
      AdminProductsComponent,
      ProductNewComponent,
      // MtImagePreviewComponent
  ]
})
export class AdminProductsModule { }

