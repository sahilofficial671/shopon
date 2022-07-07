import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories:Category[] = [];
  constructor(
    private apiService: ApiService
  ) { }

  public group_url = environment.server_url+"/categories";
  public url = environment.server_url+"/category";

  getCategory(id:any): Observable<any> {
    return this.apiService.get(this.url+"/"+id);
  }

  getCategoryBySlug(slug:any): Observable<any> {
    return this.apiService.get(this.url+"/by/slug/"+slug);
  }

  getCategories(): Observable<any> {
    return this.apiService.get(this.group_url);
  }

  getCategoriesMappedToModel(categories:any):Category[]{
    for(let index in categories){
      let category = new Category();
      category.id = categories[index].id;
      category.name = categories[index].name;
      category.description = categories[index].description;
      category.createdAt = categories[index].createdAt;
      category.updatedAt = categories[index].updatedAt;
      this.categories.push(category);
    }

    return this.categories;
  }
}
