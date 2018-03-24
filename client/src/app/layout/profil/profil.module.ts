import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from "./profil.component";
import { ProfilRoutingModule } from "./profil-routing.module";
import { LoginComponent } from '../../login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ProfilRoutingModule
  ],
  declarations: [
      ProfilComponent
  ],
  providers: [LoginComponent],
})
export class ProfilModule {}
