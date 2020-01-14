import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from '../../../model/ingredient';
import {IngredientsService} from '../../../service/ingredients.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../../_authentication/_services';
import {Location} from '@angular/common';
import {Globals} from '../../../../globals';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './ingredients-new.component.html',
  styleUrls: ['./ingredients-new.component.scss']
})
export class IngredientsNewComponent implements OnInit {
  @Input() ingredient = new Ingredient();

  constructor(
      private router: Router,
      private ingredientService: IngredientsService,
      private alertService: AlertService,
      private _location: Location,
      private globals: Globals
  ) { }

  ngOnInit() {
  }

  add(): void {
      this.ingredientService.addIngredient(this.ingredient)
          .subscribe(
              data => {
                  this.alertService.success('Ingredience \'' + this.ingredient.name + '\' přidán!');
                  this.reset();
              },
              error => {
                  this.alertService.error('Ingredience \'' + this.ingredient.name + '\' nelze přidat!');
              });
  }

  reset(): void {
      this.ingredient = new Ingredient();
  }

    backClicked() {
        this._location.back();
    }
}
