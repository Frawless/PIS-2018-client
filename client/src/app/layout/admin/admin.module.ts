import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertService} from '../../_authentication/_services/alert.service';
import {AlertComponent} from '../../_authentication/_directives/alert.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AlertComponent
    ],
    exports: [
        AlertComponent,
    ],
    providers: [
        AlertService,
    ]
})
export class AdminModule {}
