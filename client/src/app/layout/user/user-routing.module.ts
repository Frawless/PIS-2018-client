import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import {OrderDetailComponent} from '../admin/orders/detail/order-detail.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent
    },
    { path: 'order/:id', component: OrderDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
