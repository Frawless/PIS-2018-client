import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import { Product } from '../../../model/product';
import {Ingredient} from '../../../model/ingredient';
import {IngredientsService} from '../../../service/ingredients.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Globals} from '../../../../globals';

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
    private ingredientsService: IngredientsService,
    private globals: Globals
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(id)
      .subscribe(product => this.product = product);
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
