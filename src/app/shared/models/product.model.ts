import { Category } from "./category.model";

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  specialPrice: number;
  quantity: number;
  slug: string;
  categories:Array<Category>;
  createdAt: string;
  updatedAt: string;
}
