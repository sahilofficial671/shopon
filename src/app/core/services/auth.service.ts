import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstanceService } from './instance.service';
import { User } from 'src/app/shared/models/user.model';
import { Role } from 'src/app/shared/models/role.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User;

  public admin_login_url = environment.server_url+"/admin/login";
  public customer_login_url = environment.server_url+"/customer/login";

  constructor(private apiService: ApiService,
    private instanceService: InstanceService
  ) { }

  adminLogin(login_dto): Observable<any> {
    return this.apiService.post(this.admin_login_url, login_dto);
  }

  customerLogin(login_dto): Observable<any> {
    return this.apiService.post(this.customer_login_url, login_dto);
  }

  hasAuthAdmin():boolean{
    return this.instanceService.getAuthAdmin() !== null && this.instanceService.getAuthAdmin() !== undefined
  }

  hasAuthCustomer():boolean{
    return this.instanceService.getAuthCustomer() !== null && this.instanceService.getAuthCustomer() !== undefined
  }

  adminLogout():boolean{
    localStorage.removeItem("admin")
    return localStorage.getItem("admin") == null || localStorage.getItem("admin") == undefined;
  }

  customerLogout():boolean{
    localStorage.removeItem("customer")
    return localStorage.getItem("customer") == null || localStorage.getItem("customer") == undefined;
  }

  mapUsertoLocalStorage(user:any, type:string):void{
    this.user = new User();
    this.user.id = user.id;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.gender = null;
    this.user.email = null;
    this.user.userName = user.userName;
    this.user.password = null;
    this.user.dateOfBirth = null;
    this.user.phone = null;
    this.user.createdAt = null;
    this.user.updatedAt = null;

    this.user.roles = [];
    for(let role in user.roles){
      let userRole = new Role();
      userRole.id = user.roles[role].id;
      userRole.name = user.roles[role].name;
      userRole.description = null;
      userRole.createdAt = null;
      userRole.updatedAt = null;
      this.user.roles.push(userRole);
    }

    localStorage.setItem(type, JSON.stringify(this.user));
    localStorage.setItem("type", type)
  }
}
