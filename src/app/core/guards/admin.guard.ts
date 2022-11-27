import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.hasAuthAdmin() && this.authService.getAuthAdmin().hasRoleAdmin()){
        return true;
      }

      this.router.navigate(['admin/login'], {
          queryParams: { returnUrl: state.url }
      });

      this.toastr.info("Please login first.")
      return false;
  }
}
