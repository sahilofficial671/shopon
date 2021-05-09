import { Role } from "./role.model";

export class User {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  username: string;
  password: string;
  date_of_birth: string;
  phone: string;
  roles:Array<Role>;
  created_at: string;
  updated_at: string;

  hasRoleAdmin(): boolean{
    for(let role in this.roles){
      if(this.roles[role].name === "Admin"){
        return true;
      }
    }

    return false;
  }
}
