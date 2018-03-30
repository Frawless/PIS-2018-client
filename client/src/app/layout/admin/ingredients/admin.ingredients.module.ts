import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IngredientComponent } from './ingredients.component';
import { IngredientsNewComponent } from './new/ingredients-new.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
import { AdminIngredientsRoutingModule } from './admin.ingredients-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminIngredientsRoutingModule,
    FormsModule
  ],
  declarations: [
      IngredientComponent,
      IngredientsNewComponent,
      IngredientDetailComponent
  ]
})
export class AdminIngredientsModule { }

