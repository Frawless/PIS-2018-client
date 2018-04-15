import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import { Product } from '../../../model/product';
import {Ingredient} from '../../../model/ingredient';
import {IngredientsService} from '../../../service/ingredients.service';
import {AlertService} from '../../../../_authentication/_services';
import {Location} from '@angular/common';
import {MtImagePreviewComponent} from '../../../components/image-preview/image-preview';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    @Input() product: Product;
    ingredients: Ingredient[];

    @ViewChild(MtImagePreviewComponent)
    private image: MtImagePreviewComponent;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productsService: ProductsService,
        private ingredientsService: IngredientsService,
        private alertService: AlertService,
        private _location: Location
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

  save(): void {console.log(this.product.ingredients);
      this.product.image = btoa(this.image.source);

      this.productsService.update(this.product)
          .subscribe(
              data => {
                  this.alertService.success('Produkt \'' + this.product.name + '\' upraven!');
              },
              error => {
                  this.alertService.error('Produkt \'' + this.product.name + '\' nelze upravit!');
              });
  }

  delete(): void {
      this.productsService.delete(this.product)
          .subscribe(
              data => {
                  this.alertService.success('Produkt \'' + this.product.name + '\' smazán!');
              },
              error => {
                  this.alertService.error('Produkt \'' + this.product.name + '\' nelze smazat!');
              });
      this.router.navigate(['/shop/admin/products']);
  }

    validIngredients(ingredients): boolean {
        for (const item in ingredients) {
            if (this.isEmpty(ingredients[item])) {
                return false;
            }
        }
        return true;
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    getImage(product: Product) {
        if (product.image === '') {
            return;
        }
        return atob(product.image);
    }

    backClicked() {
        this._location.back();
    }
}
