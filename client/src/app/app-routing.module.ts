import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_authentication/_guards/index';

const routes: Routes = [
    { path: '', redirectTo: 'shop', pathMatch: 'full' },
    { path: 'shop', loadChildren: './shop/shop.module#ShopModule' },
    { path: 'admin', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
