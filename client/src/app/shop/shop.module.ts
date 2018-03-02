import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShopRoutingModule } from "./shop-routing.module";
import { ShopComponent } from './shop.component';
import { HeaderComponent } from './components/header/header.component';

import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
      CommonModule,
      ShopRoutingModule,
      LayoutModule,
      NgbModule.forRoot()
  ],
  declarations: [
      ShopComponent,
      HeaderComponent,
  ]
})
export class ShopModule {}
