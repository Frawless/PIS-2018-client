import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from '../../login/login.component';
import { UserService } from '../../_authentication/_services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderDetailModule} from '../admin/orders/detail/order-detail.module';
import {MatTableModule, MatSortModule} from '@angular/material';


@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
      OrderDetailModule,
      ReactiveFormsModule
  ],
  declarations: [
      UserComponent,
  ],
  providers: [
    LoginComponent,
    UserService
  ],
})
export class UserModule {}
