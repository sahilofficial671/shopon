import { Role } from "./role.model";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  userName: string;
  password: string;
  dateOfBirth: string;
  phone: string;
  roles:Array<Role>;
  createdAt: string;
  updatedAt: string;

  hasRoleAdmin(): boolean{
    for(let role in this.roles){
      if(this.roles[role].name === "Admin"){
        return true;
      }
    }

    return false;
  }

  getFullName():string{
    return this.firstName+" "+this.lastName;
  }
}
