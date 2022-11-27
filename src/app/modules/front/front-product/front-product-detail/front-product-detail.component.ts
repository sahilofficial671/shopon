import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-front-product-detail',
  templateUrl: './front-product-detail.component.html',
  styleUrls: ['./front-product-detail.component.css']
})
export class FrontProductDetailComponent implements OnInit {

  user:User;
  slug:string;
  product:Product;
  images:Object[];
  imagePrefix:string;
  noImagePath:string;

  isLoaded:boolean;
  isAddingToCart:boolean;
  isAddedToCart:boolean;
  isBuying:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.isLoaded = this.isBuying = false;
    this.isAddingToCart = false;
    this.isAddedToCart = false;
    this.imagePrefix = environment.imageKitUrl;
    this.noImagePath = environment.noImagePath
    this.images = [];
    this.slug = this.route.snapshot.paramMap.get('slug');
  }

  ngOnInit(): void {
    this.productService
      .getProductBySlug(this.slug)
      .toPromise()
      .then((data) => {
        if(data.status == 'success' && data.product){
          this.product = this.productService.getProductsMappedToModel([data.product])[0];
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

          if(this.checkoutService.isAddedToCart(this.product.id)){
            this.isAddedToCart = true;
          }

          this.isLoaded = true;
          return;
        }

        this.commonService.handleErrors();
      }).catch((err) => {
        this.isLoaded = true;
        this.commonService.handleErrors(err);
      });
  }

  addToCart(){
    if(this.authService.hasAuthCustomer()){
      this.isAddingToCart = true;

      this.checkoutService.addToCart(this.product)

      this.isAddingToCart = false;
      this.isAddedToCart = true;
      this.toastr.success("Added to Cart!");
      return;
    }

    this.router.navigate(['customer/login'], {
      queryParams: { returnUrl: this.router.routerState.snapshot.url }
    });

    this.toastr.info("Login first.");
    return;
  }

  redirectToCart(){
    console.log(this.checkoutService.getCartData());

    this.router.navigate(['/cart']);
  }
}
