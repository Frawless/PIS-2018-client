import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderNewComponent } from './new/order-new.component';
import {OrderDetailComponent} from './detail/order-detail.component';

const routes: Routes = [
    { path: '', component: OrderComponent },
    { path: 'detail/:id', component: OrderDetailComponent },
    { path: 'new', component: OrderNewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {}
