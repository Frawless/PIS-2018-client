import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CarsComponent} from "./cars.component";
import {CarsDetailComponent} from "./detail/detail-cars.component";
import {CarsNewComponent} from "./new/new-cars.component";


const routes: Routes = [
    { path: '', component: CarsComponent},
    { path: 'detail/:id', component: CarsDetailComponent },
    { path: 'new', component: CarsNewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarsRoutingModule { }
