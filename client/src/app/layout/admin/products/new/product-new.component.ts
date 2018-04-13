import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Product } from '../../../model/product';
import { Router} from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import {IngredientsService} from '../../../service/ingredients.service';
import {Ingredient} from '../../../model/ingredient';
import {AlertService} from '../../../../_authentication/_services';

import {MtImagePreviewComponent} from '../../../components/image-preview/image-preview';
import {isEmpty} from 'rxjs/operator/isEmpty';
import {forEach} from '@angular/router/src/utils/collection';
import {Location} from "@angular/common";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
    @Input() product = new Product('', null, null, [{}]);

    @ViewChild(MtImagePreviewComponent)
    private image: MtImagePreviewComponent;

    ingredients: Ingredient[];

    constructor(private router: Router,
                private productsService: ProductsService,
                private ingredientsService: IngredientsService,
                private alertService: AlertService,
                private _location: Location) {
    }

    ngOnInit() {
        this.getIngredients();
    }

    add(): void {
        this.product.image = btoa(this.image.source);

        console.log(this.product);

        this.productsService.addProduct(this.product)
            .subscribe(
                data => {
                    this.alertService.success('Produkt \'' + this.product.name + '\' přidán!');
                    this.reset();
                },
                error => {
                    this.alertService.error('Produkt \'' + this.product.name + '\' nelze přidat!');
                });
            }

    getIngredients(): void {
        this.ingredientsService.getIngredients()
            .subscribe(ingredients => this.ingredients = ingredients);
    }

    reset(): void {
        this.product = new Product('', null, null, [{}]);
        this.image.source = 'https://placehold.it/150x80?text=IMAGE';
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

    backClicked() {
        this._location.back();
    }
}
