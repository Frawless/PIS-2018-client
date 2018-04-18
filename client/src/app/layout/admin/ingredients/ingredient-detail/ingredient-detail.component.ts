import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from '../../../model/ingredient';
import {ActivatedRoute, Router} from '@angular/router';
import {IngredientsService} from '../../../service/ingredients.service';
import {AlertService} from '../../../../_authentication/_services';
import {Location} from "@angular/common";

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
      private ingredientsService: IngredientsService,
      private alertService: AlertService,
      private _location: Location
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
          .subscribe(
              data => {
                  this.alertService.success('Ingredience \'' + this.ingredient.name + '\' upravena!');
              },
              error => {
                  this.alertService.error('Ingredienci \'' + this.ingredient.name + '\' nelze upravit!');
              });
  }

  delete(): void {
      this.ingredientsService.delete(this.ingredient)
          .subscribe(
              data => {
                  this.alertService.success('Ingredience \'' + this.ingredient.name + '\' smazána!');
              },
              error => {
                  this.alertService.error('Ingredienci \'' + this.ingredient.name + '\' nelze smazat!');
              });
      this._location.back();
  }

    backClicked() {
        this._location.back();
    }

}
