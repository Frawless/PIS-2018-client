import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProductDetailComponent} from './product-detail.component';
import {MtImagePreviewComponentModule} from '../../../components/image-preview/image-preview.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MtImagePreviewComponentModule
    ],
    exports: [
        ProductDetailComponent
    ],
    declarations: [
        ProductDetailComponent
    ]
})
export class ProductDetailModule { }

