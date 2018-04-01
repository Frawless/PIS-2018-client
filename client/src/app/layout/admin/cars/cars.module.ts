import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsRoutingModule } from "./cars-routing.module";
import { CarsDetailComponent } from "./detail/detail-cars.component";
import { CarsNewComponent } from "./new/new-cars.component";
import { CarsComponent } from "./cars.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    CarsRoutingModule,
    FormsModule
  ],
  declarations: [
      CarsComponent,
      CarsDetailComponent,
      CarsNewComponent
  ]
})
export class CarsModule { }
