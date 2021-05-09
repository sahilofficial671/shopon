import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-index',
  templateUrl: './front-index.component.html',
  styleUrls: ['./front-index.component.css']
})
export class FrontIndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isAdmin():boolean{
    if(this.router.url.startsWith("admin")){
      return true;
    }
    return false;
  }

}
