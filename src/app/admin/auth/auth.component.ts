import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  credentials: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  display():void{
    console.log(this.credentials);
  }

  submit(){

  }
}
