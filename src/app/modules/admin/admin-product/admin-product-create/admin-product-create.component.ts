import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipList} from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { environment } from 'src/environments/environment';


export interface CategoryDom {
  id: number;
  name: string;
}


@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.css']
})

export class AdminProductCreateComponent implements OnInit {

  product:Product;
  categories:Category[];
  isSubmitted:boolean = false;
  isLoaded:boolean = true;

  filteredCategories: Observable<Object[]>;
  categoriesToShow:Category[] = [];
  categoryList:Category[] = [];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('chipList') chipList: MatChipList;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  mainImagePath:string;
  noImagePath:string;

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
    mainImageControl: new FormControl('', [
      Validators.required
    ]),
  });

  categoryControl = new FormControl();

  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.noImagePath = environment.noImagePath
    this.mainImagePath = this.noImagePath;

    this.categoryService
    .getCategories()
    .subscribe(async data => {
      if(data.categories){
        this.categories = this.categoryService.getCategoriesMappedToModel(data.categories);
      }

      this.isLoaded = true;

      // Initialize Categories to show on dom
      this.categories.forEach(category => this.categoriesToShow.push(category));
    }, err => {
      console.log(err);
      this.isLoaded = true;
      (err.status == 'error' && err.message != null)
      ? this.toastr.error(err.message)
      : this.toastr.error("Something went wrong. Please try again later");
    });
  }

  ngOnInit(): void {

    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map((category: string | Category | null) => category ? this._filter(category) : this.categoriesToShow.slice()));
  }

  create(){
    if(this.form.valid){
      this.form.disable()
      this.categoryControl.disable()
      this.chipList.chips.forEach((chip) => {chip.disabled = true})
      this.isSubmitted = true;

      // Gather some new & old details of model from window & variable
      let product = new Product();
      product.name = this.form.get('name').value;
      product.description = this.form.get('description').value;
      product.quantity = this.form.get('quantity').value;
      product.price = this.form.get('price').value;
      product.specialPrice = this.form.get('specialPrice').value;
      product.slug = this.form.get('slug').value;
      product.mainImagePath = this.form.get('mainImageControl').value;
      product.categories = this.categoryList;

      this.productService
      .submitProduct(product)
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

  private _filter(value: string|Category): Category[] {
    const searchFor = (value instanceof Category) ? value.name.toLowerCase() : value;
    return this.categoriesToShow.filter(category => category.name.toLowerCase().indexOf(searchFor) === 0);
  }

  uploadMainImageSuccess(event){
    this.form.get('mainImageControl').setValue(event.filePath);
    this.mainImagePath = event.url
  }

  uploadMainImageError(event){
    this.toastr.error("Unable to upload image to server. Please try again later.")
  }
}

