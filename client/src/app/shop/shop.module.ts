import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShopRoutingModule } from "./shop-routing.module";
import { ShopComponent } from './shop.component';
import { HeaderComponent } from './components/header/header.component';

import { DialogComponent } from '../dialog/dialog.component';
import { LoginComponent} from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@NgModule({
  imports: [
      CommonModule,
      ShopRoutingModule,
      NgbModule.forRoot()
  ],
  declarations: [ShopComponent, HeaderComponent, DialogComponent, LoginComponent, SignupComponent]
})
export class ShopModule {}
