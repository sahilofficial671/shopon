import { Category } from "./category.model";

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  special_price: number;
  quantity: number;
  slug: string;
  categories:Array<Category>;
  created_at: string;
  updated_at: string;
}
