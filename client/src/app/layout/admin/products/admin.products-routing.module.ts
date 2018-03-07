import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminProductsComponent } from './admin.products.component';
// import { ProductDetailComponent } from '../../shop/products/detail/product-detail.component';
import { ProductNewComponent } from './new/product-new.component';

const routes: Routes = [
    { path: '', component: AdminProductsComponent },
    // { path: 'detail/:id', component: ProductDetailComponent },
    { path: 'new', component: ProductNewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminProductsRoutingModule {}
