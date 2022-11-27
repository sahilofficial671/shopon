import { Product } from "./product.model";
import { User } from "./user.model";

export class Cart {
  product:Product;
  created_at:Date;
  updated_at:Date;

  constructor(product:Product, created_at:Date, updated_at:Date){
    this.product = product;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
