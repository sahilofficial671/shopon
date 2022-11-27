import { Injectable } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';
import { Cart } from 'src/app/shared/models/cart';
import { Product } from 'src/app/shared/models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  cartKey:string;
  totalProducts:Number = 0;

  constructor(private authService: AuthService) {
    const customer = this.authService.getAuthCustomer();

    if(customer){
      this.cartKey = customer.id + "_cart";
    }
  }

  addToCart(product:Product): void{
    const response:any = {};
    const cart = this.getCartData();

    if(cart.filter((item) => (item.id == product.id)).length > 0){
      response.status = 'error';
      response.message = 'Already added to cart!';
      return response;
    }

    localStorage.setItem(this.cartKey,
      JSON.stringify([
          ...cart, new Cart(product, new Date(), new Date())
      ])
    );

    this.getCartData();
  }

  getCartData(){
    if(this.cartKey){
      const data = localStorage.getItem(this.cartKey);

      if(data == null){
        localStorage.setItem(this.cartKey, JSON.stringify([]));
        return [];
      }

      const products = JSON.parse(data);

      this.totalProducts = products.length;

      return JSON.parse(data);
    }

    return [];
  }

  isAddedToCart(id: Number){
    const cart = this.getCartData();

    return cart.filter((item) => (item.product.id == id)).length > 0;
  }

  clearCart(): void{
    localStorage.setItem(this.cartKey, "[]")
    this.getCartData();
  }
}

