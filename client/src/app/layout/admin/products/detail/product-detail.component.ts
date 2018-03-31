import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from '../../../shop/products/service/products.service';
import { Product } from '../../../shop/products/product';
import {Ingredient} from '../../../shop/products/ingredients/ingredient';
import {IngredientsService} from '../../../shop/products/service/ingredients.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  ingredients: Ingredient[];
    private domSanitizer: DomSanitizer;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit() {
    this.getProduct();
    this.getIngredients();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  getIngredients(): void {
     this.ingredientsService.getIngredients()
     .subscribe(ingredients => this.ingredients = ingredients);
  }

  save(): void {console.log(this.product.ingredients); console.log(JSON.stringify(this.product)); console.log('-----');
      this.productsService.update(this.product)
          .subscribe();
      this.router.navigate(['/shop/admin/products']);
  }

  delete(): void {
      this.productsService.delete(this.product)
          .subscribe();
      this.router.navigate(['/shop/admin/products']);
  }

    getImage(product: Product) {
        if (product.image === '') {
            return;
        }

        // @ TODO fix, melo by se overovat to trstURL ale haze to chybu
        // return this.domSanitizer.bypassSecurityTrustUrl(atob(product.image));
        return atob(product.image);
    }
}
