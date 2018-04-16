import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

import { DialogComponent } from '../dialog/dialog.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../_authentication/_services/alert.service';
import { AlertComponent } from '../_authentication/_directives/alert.component';
import { CartWidgetComponent } from "./shop/cart-widget/cart-widget.component";
import { CartComponent } from "./shop/cart/cart.component";
import { CheckoutComponent } from "./shop/checkout/checkout.component";

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        DialogComponent,
        LoginComponent,
        AlertComponent,
        CartWidgetComponent,
        CartComponent,
        CheckoutComponent
    ],
    exports: [
        DialogComponent,
        LoginComponent,
        AlertComponent,
    ],
    providers: [
        AlertService,
    ]
})
export class LayoutModule {}
