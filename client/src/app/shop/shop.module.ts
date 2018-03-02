import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShopRoutingModule } from "./shop-routing.module";
import { ShopComponent } from './shop.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
      CommonModule,
      ShopRoutingModule,
      NgbModule.forRoot()
  ],
  declarations: [ShopComponent, HeaderComponent]
})
export class ShopModule {}
