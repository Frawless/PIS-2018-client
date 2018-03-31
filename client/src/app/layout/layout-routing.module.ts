import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {AuthGuard} from '../_authentication/_guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'user/:username', loadChildren: './user/user.module#UserModule'},
            { path: 'products', loadChildren: 'app/layout/shop/products/products.module#ProductsModule' },
            { path: 'about', loadChildren: './shop/about/about.module#AboutModule'},
            { path: 'admin/products',
              loadChildren: './admin/products/admin.products.module#AdminProductsModule' ,
              data: {expectedRole: ['ADMIN', 'EMPLOYEE']}, canActivate: [AuthGuard]
            },
            { path: 'admin/orders',
                loadChildren: './admin/orders/order.module#OrderModule' ,
                data: {expectedRole: ['ADMIN', 'EMPLOYEE']}, canActivate: [AuthGuard]
            },
            { path: 'admin/ingredients',
                loadChildren: './admin/ingredients/admin.ingredients.module#AdminIngredientsModule' ,
                data: {expectedRole: ['ADMIN', 'EMPLOYEE']}, canActivate: [AuthGuard]
            },
            { path: 'admin/users',
                loadChildren: './admin/users/users.module#UsersModule' ,
                data: {expectedRole: ['ADMIN', 'EMPLOYEE']}, canActivate: [AuthGuard]
            },
            { path: '', redirectTo: '/shop' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
