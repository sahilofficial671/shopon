import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent implements OnInit {
  customer:User;
  totalCartItems:Number;
  menus:Object[];
  actions:Object[];

  constructor(private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    public checkoutService: CheckoutService,
  ){
    this.totalCartItems = this.checkoutService.getCartData().length;

    this.menus = [
      {"url":"/electronics", "name": "Electronics", "children": [
          {"url":"/mobiles", "name": "Mobile"},
        ]
      },
      {"url":"/furnitures", "name": "Furnitures", "children": [
          {"url":"/beds", "name": "Bed"},
        ]
      },
    ];
  }

  ngOnInit(): void {
    if(this.isLogged()){
      this.customer = this.authService.getAuthCustomer();
    }
  }

  isLogged():boolean{
    return this.authService.hasAuthCustomer()
    && this.authService.getAuthCustomer()
    && this.authService.getAuthCustomer().hasRoleCustomer();
  }

  logout():void{
    this.authService.customerLogout();
    this.router.navigateByUrl("/");
    this.toastr.success("Successfuly logged out.")
  }
}
