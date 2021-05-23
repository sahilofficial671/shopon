import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-customer-index',
  templateUrl: './front-customer-index.component.html',
  styleUrls: ['./front-customer-index.component.css']
})
export class FrontCustomerIndexComponent implements OnInit {

  actions = [
    {"url":"/customer/dashboard", "name": "Dashboard", "icon": "home", "children": null},
    {"url":"/customer/orders", "name": "Orders", "icon": "shopping_basket", "children": null},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
