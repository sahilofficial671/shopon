import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.hasAuthCustomer() && this.authService.getAuthCustomer().hasRoleCustomer()){
        return true;
      }

      this.router.navigate(['customer/login'], {
          queryParams: { returnUrl: state.url }
      });

      this.toastr.info("Please login first.")
      return false;
  }

}
