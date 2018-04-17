import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {OrderDetailComponent} from './order-detail.component';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
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

