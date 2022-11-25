import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-front-product-card',
  templateUrl: './front-product-card.component.html',
  styleUrls: ['./front-product-card.component.css']
})
export class FrontProductCardComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
