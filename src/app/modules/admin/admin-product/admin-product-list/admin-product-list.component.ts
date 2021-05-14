import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/shared/models/user.model';
import { InstanceService } from 'src/app/core/services/instance.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})

export class AdminProductListComponent implements OnInit {

  displayedColumns: string[] = [
                                  'id',
                                  'name',
                                  'quantity',
                                  'price',
                                  "special_price",
                                  "actions"
                                ];
  dataSource:MatTableDataSource<Product>;

  products:Product[] = [];
  ready:boolean = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private instanceService: InstanceService
  ) { }

  ngOnInit(){
    new Promise((resolve, reject) =>{
      this.productService.getProducts()
      .subscribe(async data => {
        for(let index in data){
          let product = new Product();
          product.id = data[index].id;
          product.name = data[index].name;
          product.description = data[index].description;
          product.quantity = data[index].quantity;
          product.price = data[index].price;
          product.special_price = data[index].specialPrice;
          product.slug = data[index].slug;
          product.created_at = data[index].createdAt;
          product.updated_at = data[index].updatedAt;
          product.categories = [];
          for(let catIndex in data[index].categories){
            let category = new Category();
            category.id = data[index].categories[catIndex].id;
            category.name = data[index].categories[catIndex].name;
            category.description = data[index].categories[catIndex].description;
            category.created_at = data[index].categories[catIndex].createdAt;
            category.updated_at = data[index].categories[catIndex].updatedAt;
            product.categories.push(category)
          }
          this.products.push(product);
          resolve(data);
        }
      }, err => {
        reject(err);
      });
    }).then((data) => {
      this.ready = true;
      this.dataSource = new MatTableDataSource(this.products)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch((err) => {
      console.log(err);
    })
  }

}
