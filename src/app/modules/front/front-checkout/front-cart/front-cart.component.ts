import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-front-cart',
  templateUrl: './front-cart.component.html',
  styleUrls: ['./front-cart.component.css']
})
export class FrontCartComponent implements OnInit {

  products:Product[] = [];

  constructor(private productService: ProductService,
    private commonService: CommonService,
    private checkoutService: CheckoutService
  ) {
    const products = this.checkoutService
      .getCartData()
      .map((product) => product.product);

    this.products = this.productService.getProductsMappedToModel(products);
  }

  ngOnInit(): void {
  }

  clearCart(): void{
    this.checkoutService.clearCart();
    this.products = [];
  }
}
