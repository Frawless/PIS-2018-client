import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderNewComponent } from './new/order-new.component';
import { FormsModule } from '@angular/forms';
import {OrderDetailComponent} from './detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule
  ],
  declarations: [
      OrderComponent,
      OrderNewComponent,
      OrderDetailComponent
  ]
})
export class OrderModule { }

