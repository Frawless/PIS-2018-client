import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from "./profil.component";
import { ProfilRoutingModule } from "./profil-routing.module";
import { LoginComponent } from '../../login/login.component';
import { UserService } from '../../_authentication/_services/user.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfilRoutingModule,
    FormsModule
  ],
  declarations: [
      ProfilComponent
  ],
  providers: [
    LoginComponent,
    UserService
  ],
})
export class ProfilModule {}
