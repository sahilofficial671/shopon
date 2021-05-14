import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }

  id:string;

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
  }
}
