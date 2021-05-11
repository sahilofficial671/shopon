import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { InstanceService } from 'src/app/core/services/instance.service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})
export class AdminIndexComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    private instanceService: InstanceService,
    private toastr: ToastrService,
    ) {
    }

  ngOnInit(): void {

  }

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

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
  onRouterDeactivate(event):void{
    this.isLogged() ? this.sidenav.open() : this.sidenav.close()
    console.log(event);
  }
}
