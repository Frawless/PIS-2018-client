import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

import { DialogComponent } from '../dialog/dialog.component';
import { LoginComponent} from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, DialogComponent, LoginComponent, SignupComponent]
})
export class LayoutModule {}
