import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ShopProductsComponent } from './shop.products.component';
import { ProductDetailComponent } from '../detail/product-detail.component';
import { ProductNewComponent } from '../new/product-new.component';

const routes: Routes = [
    { path: '', component: ShopProductsComponent },
    { path: 'detail/:id', component: ProductDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopProductsRoutingModule {}
