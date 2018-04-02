import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from "../../../service/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../model/product";
import {CartService} from "../../../service/cart.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product: Product;
  @Input() quantity: number = 1;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private productsService: ProductsService,
      private cartService: CartService
  ) { }

  ngOnInit() {
      this.getProduct();
  }

  getProduct(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.productsService.getProduct(id)
          .subscribe(product => this.product = product);
  }

  getImage(product: Product) {
    if (product && product.image === '') {
        return;
    }
      // @ TODO fix, melo by se overovat to trstURL ale haze to chybu
      // return this.domSanitizer.bypassSecurityTrustUrl(atob(product.image));
      return atob(product.image);
  }

  addToCart() {
      this.cartService.add(this.product, this.quantity);
  }
}
