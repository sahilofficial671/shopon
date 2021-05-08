import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent implements OnInit {

  links = [
    {"url":"/", "name": "Home"},
    {"url":"/admin", "name": "Admin"}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
