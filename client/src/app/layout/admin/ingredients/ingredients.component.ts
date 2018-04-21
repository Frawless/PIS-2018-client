import { Component, OnInit, ViewChild } from '@angular/core';
import {IngredientsService} from '../../service/ingredients.service';
import {Ingredient} from '../../model/ingredient';
import {MatSort, MatSortable, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  displayedColumns = ['name', 'supplier'];

  ingredients: Ingredient[];

  constructor( private ingredientsService: IngredientsService ) { }

  ngOnInit() {
      this.getIngredients();
  }

  getIngredients(): void {
      this.ingredientsService.getIngredients()
          .subscribe(ingredients => {
             this.ingredients = ingredients;
             this.dataSource = new MatTableDataSource(ingredients);
             this.dataSource.sort = this.sort;
           });
  }
}
