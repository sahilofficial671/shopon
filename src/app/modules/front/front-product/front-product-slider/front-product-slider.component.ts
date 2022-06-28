import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-front-product-slider',
  templateUrl: './front-product-slider.component.html',
  styleUrls: ['./front-product-slider.component.css']
})
export class FrontProductSliderComponent implements OnInit {

  products:Product[];

  imagePrefix:string;
  noImagePath:string;
  isLoaded:boolean;

  constructor(private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
  ) {
    this.imagePrefix = environment.imageKitUrl;
    this.noImagePath = environment.noImagePath
    this.products = [];
    this.isLoaded = false;

    this.productService.getProducts({
      'withCategory': false,
    })
    .toPromise()
    .then((data) => {
      this.products = this.productService.getProductsMappedToModel(data.products);
      this.isLoaded = true;
    }).catch((err) => {
      console.log(err);
      this.isLoaded = true;
      (err.status == 'error' && err.message != null)
      ? this.toastr.error(err.message)
      : this.toastr.error("Something went wrong. Please try again later");
    })
  }

  ngOnInit(): void { }

}
