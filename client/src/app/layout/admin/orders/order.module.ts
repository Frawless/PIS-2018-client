import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderNewComponent } from './new/order-new.component';
import { FormsModule } from '@angular/forms';
import {OrderDetailModule} from './detail/order-detail.module';
import {MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    OrderRoutingModule,
    FormsModule,
      OrderDetailModule
  ],
  declarations: [
      OrderComponent,
      OrderNewComponent,
  ]
})
export class OrderModule { }
