import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipList } from '@angular/material/chips';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/shared/models/category.model';
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

  filteredCategories: Observable<Object[]>;
  categoriesToShow:Category[] = [];
  categoryList:Category[] = [];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('chipList') chipList: MatChipList;
  categoryControl = new FormControl();

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
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categoryService
    .getCategories()
    .subscribe(async data => {
      console.log(data);
      let categories = this.categoryService.getCategoriesMappedToModel(data.categories);

      if(data.categories){
        this.isLoaded = true;
          // Initialize Categories to show on dom
         categories.forEach(category => this.categoriesToShow.push(category));
      }

    }, err => {
      console.log(err);
      this.isLoaded = true;
      (err.status == 'error' && err.message != null)
      ? this.toastr.error(err.message)
      : this.toastr.error("Something went wrong. Please try again later");
    });
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');

    // Fetch Product
      this.productService
      .getProduct(this.id)
      .subscribe(data => {
        if(data.status == 'success' && data.product){
          this.isLoaded = true;
          this.product = this.productService.getProductsMappedToModel([data.product])[0];

           // Initialize Categories to show on dom
           this.product.categories.forEach(category => this.categoryList.push(category));

          // Set form values
          this.form.get('name').setValue(this.product.name)
          this.form.get('description').setValue(this.product.description)
          this.form.get('quantity').setValue(this.product.quantity)
          this.form.get('price').setValue(this.product.price)
          this.form.get('specialPrice').setValue(this.product.specialPrice)
          this.form.get('slug').setValue(this.product.slug)
        }
      }, err => {
        console.log(err);
        this.isLoaded = true;
        (err.status == 'error' && err.message != null)
        ? this.toastr.error(err.message)
        : this.toastr.error("Something went wrong. Please try again later");
      });

      this.filteredCategories = this.categoryControl.valueChanges.pipe(
        startWith(''),
        map((category: string | Category | null) => category ? this._filter(category) : this.categoriesToShow.slice()));
  }

  private _filter(value: string|Category): Category[] {
    const searchFor = (value instanceof Category) ? value.name.toLowerCase() : value;
    return this.categoriesToShow.filter(category => category.name.toLowerCase().indexOf(searchFor) === 0);
  }

  remove(cat: Category): void {
    this.categoryList = this.categoryList.filter(category => category.id !== cat.id);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // Filter from already selected before adding them
    if(this.categoryList.filter(category => event.option.value.id == category.id).length > 0){
      this.toastr.error("Already selected!")
      return;
    }

    this.categoryList.push(event.option.value);
    this.categoryInput.nativeElement.value = '';
    this.categoryControl.setValue(null);
  }

  update(){
    if(this.form.valid){
      this.form.disable()
      this.categoryControl.disable()
      this.chipList.chips.forEach((chip) => {chip.disabled = true})
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
      product.categories = this.categoryList;

      this.productService
      .updateProduct(product)
      .subscribe(data => {
        if(data.status == 'success' && data.message != null){
          this.form.enable()
          this.categoryControl.enable()
          this.chipList.chips.forEach((chip) => {chip.disabled = false})
          this.isSubmitted = false;
          this.toastr.success(data.message);
        }
      }, err => {
        this.form.enable()
        this.categoryControl.enable()
        this.chipList.chips.forEach((chip) => {chip.disabled = false})
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
