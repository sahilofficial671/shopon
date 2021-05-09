import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InstanceService } from '../services/instance.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private instanceService: InstanceService,
    private authService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.hasAuth() && this.instanceService.getAuthUser().hasRoleAdmin()){
        return true;
      }

      this.router.navigateByUrl('admin/login');
      this.toastr.error("Please login first.")
      return false;
  }
}
