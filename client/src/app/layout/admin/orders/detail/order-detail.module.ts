import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {OrderDetailComponent} from './order-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // OrderDetailComponent
    ],
    exports: [
        OrderDetailComponent
    ],
    declarations: [
        OrderDetailComponent
    ]
})
export class OrderDetailModule { }

