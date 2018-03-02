import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: '', redirectTo: 'shop', pathMatch: 'full' },
    { path: 'shop', loadChildren: './shop/shop.module#ShopModule' },
    { path: 'admin', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
