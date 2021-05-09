import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstanceService } from './instance.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public admin_login_url = environment.server_url+"/admin/login";

  constructor(private apiService: ApiService,
    private instanceService: InstanceService
  ) { }

  adminLogin(login_dto): Observable<any> {
    return this.apiService.post(this.admin_login_url, login_dto);
  }

  hasAuth():boolean{
    return this.instanceService.getAuthUser() !== null
  }
}
