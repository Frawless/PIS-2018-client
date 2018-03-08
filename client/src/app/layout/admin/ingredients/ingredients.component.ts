import { Component, OnInit } from '@angular/core';
import {IngredientsService} from "../../shop/products/service/ingredients.service";
import {Ingredient} from "../../shop/products/ingredients/ingredient";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredients: Ingredient[];

  constructor( private ingredientsService: IngredientsService ) { }

  ngOnInit() {
      this.getProducts();
  }

  getProducts(): void {
      this.ingredientsService.getIngredients()
          .subscribe(ingredients => this.ingredients = ingredients);
  }
}
