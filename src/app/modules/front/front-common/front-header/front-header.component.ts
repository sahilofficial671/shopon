import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
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
  customer:User;

  constructor(private router: Router,
    private authService: AuthService,
    private instanceService: InstanceService,
    private toastr: ToastrService
  ){ }

  menus = [
    {"url":"/electronics", "name": "Electronics", "children": [
        {"url":"/mobiles", "name": "Mobile"},
      ]
    },
    {"url":"/furnitures", "name": "Furnitures", "children": [
        {"url":"/beds", "name": "Bed"},
      ]
    },
  ];

  actions = [
    {"url":"/cart", "name": "Cart", "icon": "shopping_basket", "children": null},
  ];

  ngOnInit(): void {
    if(this.isLogged()){
      this.customer = this.instanceService.getAuthCustomer();
    }
  }

  isLogged():boolean{
    return this.authService.hasAuthCustomer()
    && this.instanceService.getAuthCustomer()
    && this.instanceService.getAuthCustomer().hasRoleCustomer();
  }

  logout():void{
    this.authService.customerLogout();
    this.router.navigateByUrl("/");
    this.toastr.success("Successfuly logged out.")
  }
}
