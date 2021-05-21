import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { ProductImage } from 'src/app/shared/models/product-image.model';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { InstanceService } from './instance.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Product[];
  constructor(
    private apiService: ApiService,
    private instanceService: InstanceService
  ) { }

  public group_url = environment.server_url+"/products";
  public url = environment.server_url+"/product";

  getProduct(id:any): Observable<any> {
    return this.apiService.get(this.url+"/"+id);
  }

  getProducts(): Observable<any> {
    return this.apiService.get(this.group_url);
  }

  submitProduct(product:Product): Observable<any> {
    return this.apiService.post(this.url+"/submit", product);
  }

  updateProduct(product:Product): Observable<any>{
    return this.apiService.put(this.url+"/update", product);
  }

  deleteProduct(product:Product): Observable<any>{
    return this.apiService.delete(this.url+"/"+product.id+"/delete");
  }

  getProductsMappedToModel(products:any):Product[]{
    this.products = [];
    for(let index in products){
      let product = new Product();
      product.id = products[index].id;
      product.name = products[index].name;
      product.description = products[index].description;
      product.quantity = products[index].quantity;
      product.price = products[index].price;
      product.specialPrice = products[index].specialPrice;
      product.slug = products[index].slug;
      product.mainImagePath = products[index].mainImagePath;
      product.createdAt = products[index].createdAt;
      product.updatedAt = products[index].updatedAt;
      product.images = [];

      for(let imageIndex in products[index].images){
        product.images.push(new ProductImage(products[index].images[imageIndex].path));
      }

      product.categories = [];
      for(let catIndex in products[index].categories){
        let category = new Category();
        category.id = products[index].categories[catIndex].id;
        category.name = products[index].categories[catIndex].name;
        category.description = products[index].categories[catIndex].description;
        category.createdAt = products[index].categories[catIndex].createdAt;
        category.updatedAt = products[index].categories[catIndex].updatedAt;
        product.categories.push(category)
      }

      this.products.push(product);
    }

    return this.products;
  }
}
