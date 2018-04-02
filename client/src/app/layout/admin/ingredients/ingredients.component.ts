import { Component, OnInit } from '@angular/core';
import {IngredientsService} from '../../service/ingredients.service';
import {Ingredient} from '../../model/ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredients: Ingredient[];

  constructor( private ingredientsService: IngredientsService ) { }

  ngOnInit() {
      this.getIngredients();
  }

  getIngredients(): void {
      this.ingredientsService.getIngredients()
          .subscribe(ingredients => this.ingredients = ingredients);
  }
}
