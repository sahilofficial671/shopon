import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { InstanceService } from './instance.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
}
