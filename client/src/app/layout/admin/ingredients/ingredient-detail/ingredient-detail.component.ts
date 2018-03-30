import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from '../../../shop/products/ingredients/ingredient';
import {ActivatedRoute, Router} from '@angular/router';
import {IngredientsService} from '../../../shop/products/service/ingredients.service';

@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrls: ['./ingredient-detail.component.scss']
})
export class IngredientDetailComponent implements OnInit {
    @Input() ingredient: Ingredient;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private ingredientsService: IngredientsService
  ) { }

  ngOnInit() {
      this.getIngredient();
  }

  getIngredient(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.ingredientsService.getIngredient(id)
         .subscribe(ingredient => this.ingredient = ingredient);
  }

  save(): void {
      this.ingredientsService.update(this.ingredient)
          .subscribe();
      this.router.navigate(['/shop/admin/ingredients']);
  }

  delete(): void {
      this.ingredientsService.delete(this.ingredient)
          .subscribe();
      this.router.navigate(['/shop/admin/ingredients']);
  }

}
