import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsRoutingModule } from "./cars-routing.module";
import { CarsDetailComponent } from "./detail/detail-cars.component";
import { CarsNewComponent } from "./new/new-cars.component";
import { CarsComponent } from "./cars.component";
import {FormsModule} from "@angular/forms";
import {MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule} from '@angular/material';


@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
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
