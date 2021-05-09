import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  user:User;

  constructor() {}

  getAuthUser():User{
    return this.getUserFromLocalStorage();
  }

  getUserFromLocalStorage():User{
    let user = JSON.parse(localStorage.getItem("user"));
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

      return this.user;
    }
  }
}
