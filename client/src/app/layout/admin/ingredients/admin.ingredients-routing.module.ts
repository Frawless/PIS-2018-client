import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientComponent } from "./ingredients.component";
import { IngredientsNewComponent } from "./new/ingredients-new.component";
import {IngredientDetailComponent} from "./ingredient-detail/ingredient-detail.component";

const routes: Routes = [
    { path: '', component: IngredientComponent},
    { path: 'new', component: IngredientsNewComponent},
    { path: 'detail/:id', component: IngredientDetailComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminIngredientsRoutingModule {}
