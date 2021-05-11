import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { InstanceService } from 'src/app/core/services/instance.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent implements OnInit {
  // @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  links = [
    {"url":"/", "name": "Home"},
  ];

  adminLinks = [
    {"url":"admin/dashboard", "name": "Dashboard"},
  ];

  constructor(private router: Router,
  private authService: AuthService,
  private instanceService: InstanceService,
  private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  isAdmin():boolean{
    if(this.router.url.startsWith("/admin")){
      return true;
    }
    return false;
  }

  adminLogout():void{
    this.authService.adminLogout();
    this.router.navigateByUrl("/admin/login");
    this.toastr.success("Successfuly logged out.")
  }

  adminLoggedIn():boolean{
    return this.authService.hasAuth()
    && this.instanceService.getAuthUser()
    && this.instanceService.getAuthUser().hasRoleAdmin();
  }

}
