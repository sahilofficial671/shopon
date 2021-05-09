import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  hasRole(role:string): boolean{
    let roles:any = sessionStorage.getItem("role");

    for(role in roles){
      console.log(roles[role]);
    }

    return true;
  }
}
