import {Component, Input, OnInit} from '@angular/core';
import { Product } from '../../../shop/products/product';
import { Router} from '@angular/router';
import { ProductsService } from '../../../shop/products/service/products.service';
import {IngredientsService} from "../../../shop/products/service/ingredients.service";
import {Ingredient} from "../../../shop/products/ingredients/ingredient";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
    @Input() product = new Product("",null, null, [{}]);
    ingredients: Ingredient[];

    constructor(
        private router: Router,
        private productsService: ProductsService,
        private ingredientsService: IngredientsService
    ) {}

  ngOnInit() {
      this.getIngredients();
      //this.product.ingredients.push(this.ingredients[0]);
  }

  add(): void {console.log( JSON.stringify(this.product) );
     this.productsService.addProduct(this.product)
         .subscribe();
     this.router.navigate(['/shop/admin/products']);
  }

  getIngredients(): void {
     this.ingredientsService.getIngredients()
         .subscribe(ingredients => this.ingredients = ingredients);
  }
}
