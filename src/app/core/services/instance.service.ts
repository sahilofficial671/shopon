import { Injectable } from '@angular/core';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  user:User;

  constructor() {}

  getAuthAdmin():User{
    return this.getUserFromLocalStorage("admin");
  }

  getAuthCustomer():User{
    return this.getUserFromLocalStorage("customer");
  }

  getUserFromLocalStorage(type:string):User{
    let user = JSON.parse(localStorage.getItem(type));
    if(user){
      this.user = new User();
      this.user.id = user.id;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.gender = user.gender;
      this.user.email = user.email;
      this.user.userName = user.userName;
      this.user.password = user.password;
      this.user.dateOfBirth = user.dateOfBirth;
      this.user.phone = user.phone;
      this.user.createdAt = user.createdAt;
      this.user.updatedAt = user.updatedAt;

      this.user.roles = [];
      for(let role in user.roles){
        let userRole = new Role();
        userRole.id = user.roles[role].id;
        userRole.name = user.roles[role].name;
        userRole.description = user.roles[role].description;
        userRole.createdAt = user.roles[role].createdAt;
        userRole.updatedAt = user.roles[role].updatedAt;
        this.user.roles.push(userRole);
      }

      return this.user;
    }
  }
}
