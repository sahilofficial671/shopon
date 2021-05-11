import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { InstanceService } from 'src/app/core/services/instance.service';

@Component({
  selector: 'app-front-index',
  templateUrl: './front-index.component.html',
  styleUrls: ['./front-index.component.css']
})
export class FrontIndexComponent implements OnInit {

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private router: Router,
    private authService: AuthService,
    private instanceService: InstanceService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
  }

  links = [
    {"url":"/", "name": "Home"},
  ];

  isAdmin():boolean{
    if(this.router.url.startsWith("admin")){
      return true;
    }
    return false;
  }

  adminLoggedIn():boolean{
    return this.authService.hasAuth()
    && this.instanceService.getAuthUser()
    && this.instanceService.getAuthUser().hasRoleAdmin();
  }

}
