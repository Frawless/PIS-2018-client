import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AuthGuard} from '../../_authentication/_guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'products', loadChildren: './products/products.module#ProductsModule' , data: {expectedRole: ['ADMIN', 'EMPLOYEE']}, canActivate: [AuthGuard]},
            { path: '', redirectTo: '/shop/admin' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
