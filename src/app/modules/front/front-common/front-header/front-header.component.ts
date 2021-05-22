import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent implements OnInit {
  constructor(
  ) { }

  menus = [
    {"url":"/electronics", "name": "Electronics", "children": [
        {"url":"/mobiles", "name": "Mobile"},
      ]
    },
    {"url":"/furnitures", "name": "Furnitures", "children": [
        {"url":"/beds", "name": "Bed"},
      ]
    },
    {"url":"/all-products", "name": "All Products", "children": null}
  ];

  actions = [
    {"url":"/cart", "name": "Cart", "icon": "shopping_basket", "children": null},
    {"url":"/customer", "name": "Customer", "icon": "person", "children": [
      {"url":"/login", "name": "Login", "icon": "lock"},
    ]},
  ];

  ngOnInit(): void {
  }
}
