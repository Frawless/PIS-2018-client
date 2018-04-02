import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './_authentication/_guards/index';
import { JwtInterceptor } from './_authentication/_helpers/index';
import { AuthenticationService, UserService } from './_authentication/_services/index';

import { ProductsService } from './layout/service/products.service';

// used to create fake backend
import {DataService, Globals} from './globals';
import {IngredientsService} from './layout/service/ingredients.service';
import {OrderService} from './layout/admin/orders/service/order.service';
import {CarsService} from "./layout/service/cars.service";
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {CartService} from "./layout/service/cart.service";



// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgIdleKeepaliveModule.forRoot()
    ],
    exports: [],
    declarations: [
        AppComponent,
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        // provider used to create fake backend
        ProductsService,
        IngredientsService,
        CarsService,
        CartService,
        OrderService,
        Globals,
        DataService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
