import { Category } from "./category.model";
import { ProductImage } from "./product-image.model";

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  specialPrice: number;
  quantity: number;
  slug: string;
  mainImagePath: string;
  images:ProductImage[];
  categories:Category[];
  createdAt: string;
  updatedAt: string;
}
