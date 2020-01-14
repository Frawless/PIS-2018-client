import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin.products.component';
import { ProductNewComponent } from './new/product-new.component';
import {ProductDetailComponent} from "./detail/product-detail.component";

const routes: Routes = [
    { path: '', component: AdminProductsComponent },
    { path: 'detail/:id', component: ProductDetailComponent },
    { path: 'new', component: ProductNewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminProductsRoutingModule {}
