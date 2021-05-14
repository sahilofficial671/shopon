import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { InstanceService } from 'src/app/core/services/instance.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})
export class AdminIndexComponent implements OnInit {

  user:User;

  constructor(private router: Router,
    private authService: AuthService,
    private instanceService: InstanceService,
    private toastr: ToastrService,
    ) {
    }

  ngOnInit(): void {
    this.user = this.instanceService.getAuthUser()
    console.log(this.user);
  }

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  links = [
    {"url":"/admin/dashboard", "name": "Dashboard"},
    {"url":"/admin/products", "name": "Products"},
    {"url":"/admin/orders", "name": "Orders"},
    {"url":"/admin/users", "name": "Users"},
  ];

  isAdmin():boolean{
    if(this.router.url.startsWith("/admin")){
      return true;
    }
    return false;
  }

  logout():void{
    this.authService.adminLogout();
    this.router.navigateByUrl("/admin/login");
    this.toastr.success("Successfuly logged out.")
  }

  isLogged():boolean{
    return this.authService.hasAuth()
    && this.instanceService.getAuthUser()
    && this.instanceService.getAuthUser().hasRoleAdmin();
  }

  // On every route change toggle sidenav
  onRouterActivate(event):void{

    if(this.isLogged()){
      this.sidenav.open()
      return;
    }

    this.sidenav.close()
  }
}
