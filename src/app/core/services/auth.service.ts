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

  constructor(private apiService: ApiService,
    private instanceService: InstanceService
  ) { }

  adminLogin(login_dto): Observable<any> {
    return this.apiService.post(this.admin_login_url, login_dto);
  }

  hasAuth():boolean{
    return this.instanceService.getAuthUser() !== null && this.instanceService.getAuthUser() !== undefined
  }

  adminLogout():boolean{
    localStorage.removeItem("user")
    return localStorage.getItem("user") == null || localStorage.getItem("user") == undefined;
  }

  mapUsertoLocalStorage(user:any):void{
    this.user = new User();
    this.user.id = user.id;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.gender = null;
    this.user.email = null;
    this.user.username = user.userName;
    this.user.password = null;
    this.user.date_of_birth = null;
    this.user.phone = null;
    this.user.created_at = null;
    this.user.updated_at = null;

    this.user.roles = [];
    for(let role in user.roles){
      let userRole = new Role();
      userRole.id = user.roles[role].id;
      userRole.name = user.roles[role].name;
      userRole.description = null;
      userRole.created_at = null;
      userRole.updated_at = null;
      this.user.roles.push(userRole);
    }

    localStorage.setItem("user", JSON.stringify(this.user));
  }
}
