import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserService } from '../../../_authentication/_services/user.service';
import { FormsModule } from '@angular/forms';
import {MatTableModule, MatSortModule} from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ],
  declarations: [
      UsersComponent,
  ],
  providers: [
    UserService
  ],
})
export class UsersModule {}
