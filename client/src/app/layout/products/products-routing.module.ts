import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { ProductsComponent } from "./products.component";
import { ProductDetailComponent } from './product-detail.component';
import { ProductNewComponent } from './product-new.component';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'detail/:id', component: ProductDetailComponent },
    { path: 'new', component: ProductNewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {}
