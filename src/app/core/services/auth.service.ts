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
    if(user){
      this.user = new User();
      this.user.id = user['id'];
      this.user.first_name = user.firstName;
      this.user.last_name = user.lastName;
      this.user.gender = user.gender;
      this.user.email = user.email;
      this.user.username = user.userName;
      this.user.password = user.password;
      this.user.date_of_birth = user.dateOfBirth;
      this.user.phone = user.phone;
      this.user.created_at = user.createdAt;
      this.user.updated_at = user.updatedAt;

      this.user.roles = [];
      for(let role in user.roles){
        let userRole = new Role();
        userRole.id = user.roles[role].id;
        userRole.name = user.roles[role].name;
        userRole.description = user.roles[role].description;
        userRole.created_at = user.roles[role].created_at;
        userRole.updated_at = user.roles[role].updatedAt;
        this.user.roles.push(userRole);
      }

      localStorage.setItem("user", JSON.stringify(this.user));
    }
  }
}
