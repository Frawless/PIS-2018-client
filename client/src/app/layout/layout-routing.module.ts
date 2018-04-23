import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../_authentication/_guards/auth.guard';
import { CartComponent } from "./shop/cart/cart.component";
import { CheckoutComponent } from "./shop/checkout/checkout.component";
import {HomeComponent} from "./shop/home/home.component";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent},
            { path: 'user/:username',
                loadChildren: './user/user.module#UserModule',
                data: {expectedRole: ['ADMIN', 'EMPLOYEE', 'USER']}, canActivate: [AuthGuard],
            },
            { path: 'products', loadChildren: 'app/layout/shop/products/products.module#ProductsModule' },
            { path: 'cart',component: CartComponent},
            { path: 'checkout',
                component: CheckoutComponent,
                data: {expectedRole: ['ADMIN', 'EMPLOYEE', 'USER']}, canActivate: [AuthGuard]
            },
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
            { path: 'admin/cars',
                loadChildren: './admin/cars/cars.module#CarsModule' ,
                data: {expectedRole: ['ADMIN', 'EMPLOYEE']}, canActivate: [AuthGuard]
            },
            { path: 'admin/users',
                loadChildren: './admin/users/users.module#UsersModule' ,
                data: {expectedRole: ['ADMIN', 'EMPLOYEE']}, canActivate: [AuthGuard]
            },
            { path: '', redirectTo: '/shop/home' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
