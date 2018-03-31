import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from '../../login/login.component';
import { UserService } from '../../_authentication/_services/user.service';
import { FormsModule } from '@angular/forms';
import {OrderDetailModule} from '../admin/orders/detail/order-detail.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
      OrderDetailModule
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
