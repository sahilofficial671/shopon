import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-front-product-detail',
  templateUrl: './front-product-detail.component.html',
  styleUrls: ['./front-product-detail.component.css']
})
export class FrontProductDetailComponent implements OnInit {

  slug:string;
  product:Product;
  images:Object[];
  imagePrefix:string;
  noImagePath:string;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {
    this.imagePrefix = environment.imageKitUrl;
    this.noImagePath = environment.noImagePath
    this.images = [];

    this.slug = this.route.snapshot.paramMap.get('slug');
    this.productService
      .getProductBySlug(this.slug)
      .toPromise()
      .then((data) => {
        if(data.status == 'success' && data.product){
          this.product = this.productService.getProductsMappedToModel([data.product])[0];
          // console.log(this.product);

          if(this.product.images.length > 0){
            this.product.images.forEach((image) => {
              this.images.push({
                image: this.imagePrefix + image.path,
                thumbImage: this.imagePrefix + image.path,
              });
            });
          }

          if(this.product.images.length == 0){
            this.images.push({
              image: this.noImagePath,
              thumbImage: this.noImagePath,
            });
          }


          console.log(this.images);
          return;
        }

        this.toastr.error("Something went wrong. Please try again later");
      }).catch((err) => {
        if(err.status == 'error' && err.message != null){
          this.toastr.error(err.message)
          return;
        }
        if(err.errors && err.errors.length > 0 && err.errors[0].defaultMessage != null){
          this.toastr.error(err.errors[0].defaultMessage)
          return;
        }
        this.toastr.error("Something went wrong. Please try again later");
      });
  }

  ngOnInit(): void {

  }

}
