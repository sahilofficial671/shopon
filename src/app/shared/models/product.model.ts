import { environment } from "src/environments/environment";
import { Category } from "./category.model";

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  specialPrice: number;
  quantity: number;
  slug: string;
  mainImagePath: string;
  categories:Array<Category>;
  createdAt: string;
  updatedAt: string;
}
