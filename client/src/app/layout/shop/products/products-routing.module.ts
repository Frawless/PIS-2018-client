import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './detail/product-detail.component';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'detail/:id', component: ProductDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {}
