import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../shop/products/ingredients/ingredient";
import {IngredientsService} from "../../../shop/products/service/ingredients.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './ingredients-new.component.html',
  styleUrls: ['./ingredients-new.component.scss']
})
export class IngredientsNewComponent implements OnInit {
  @Input() ingredient = new Ingredient();

  constructor(
      private router: Router,
      private ingredientService: IngredientsService
  ) { }

  ngOnInit() {
  }

  add(): void {console.log(this.ingredient);
      this.ingredientService.addIngredient(this.ingredient)
          .subscribe();
      this.router.navigate(['/shop/admin/ingredients']);
  }
}
