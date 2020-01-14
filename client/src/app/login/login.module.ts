import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {DataService} from "../globals";

@NgModule({
    imports: [
        CommonModule, LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    // declarations: [LoginComponent],
    providers: [DataService]
})
export class LoginModule {}
