import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Product } from '../../../model/product';
import { Router} from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import {IngredientsService} from '../../../service/ingredients.service';
import {Ingredient} from '../../../model/ingredient';

import {MtImagePreviewComponent} from '../../../components/image-preview/image-preview';

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
                private ingredientsService: IngredientsService) {
    }

    ngOnInit() {
        this.getIngredients();
    }

    add(): void {
        this.product.image = btoa(this.image.source);

        this.productsService.addProduct(this.product)
            .subscribe();
        this.router.navigate(['/shop/admin/products']);
    }

    getIngredients(): void {
        this.ingredientsService.getIngredients()
            .subscribe(ingredients => this.ingredients = ingredients);
    }

}
