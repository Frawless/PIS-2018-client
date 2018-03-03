import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShopComponent } from "./shop.component";

const routes: Routes = [
    {
        path: '',
        component: ShopComponent,
        children: [
            { path: 'about', loadChildren: './about/about.module#AboutModule' },
            { path: 'products', loadChildren: './products/products.module#ProductsModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }

