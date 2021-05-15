import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {

  id:string;
  product:Product;
  isSubmitted:boolean = false;
  isLoaded:boolean = false;

  form:FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    quantity: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    specialPrice: new FormControl('', [
      Validators.required
    ]),
    slug: new FormControl('', [
      Validators.required
    ]),
  });


  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService
  ) {
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');

    // Fetch Product
      this.productService
      .getProduct(this.id)
      .subscribe(data => {
        if(data.status == 'success' && data.product){
          this.product = this.productService.getProductsMappedToModel([data.product])[0];
          this.isLoaded = true;

          // Set form values
          this.form.get('name').setValue(this.product.name)
          this.form.get('description').setValue(this.product.description)
          this.form.get('quantity').setValue(this.product.quantity)
          this.form.get('price').setValue(this.product.price)
          this.form.get('specialPrice').setValue(this.product.specialPrice)
          this.form.get('slug').setValue(this.product.slug)
        }
      }, err => {
        (err.status == 'error' && err.message != null)
        ? this.toastr.error(err.message)
        : this.toastr.error("Something went wrong.");
        console.log(err);
      });
  }

  update(){
    if(this.form.valid){
      this.form.disable()
      this.isSubmitted = true;

      // Gather some new & old details of model from window & variable
      let product = new Product();
      product.id = this.product.id;
      product.name = this.form.get('name').value;
      product.description = this.form.get('description').value;
      product.quantity = this.form.get('quantity').value;
      product.price = this.form.get('price').value;
      product.specialPrice = this.form.get('specialPrice').value;
      product.slug = this.form.get('slug').value;
      product.categories = this.product.categories;

      this.productService
      .updateProduct(product)
      .subscribe(data => {
        if(data.status == 'success' && data.message != null){
          this.form.enable()
          this.isSubmitted = false;
          this.toastr.success(data.message);
        }
      }, err => {
        this.form.enable()
        console.log(err);
        this.isSubmitted = false;
        if(err.status == 'error' && err.message != null){
          this.toastr.error(err.message)
          return;
        }

        if(err.errors && err.errors.length > 0 && err.errors[0].defaultMessage != null){
          this.toastr.error(err.errors[0].defaultMessage)
          return;
        }

        this.toastr.error("Something went wrong. Please try again later");
      })
    }
  }
}
