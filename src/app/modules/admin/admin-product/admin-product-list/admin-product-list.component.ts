import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})

export class AdminProductListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'name', 'quantity', 'price', "specialPrice", "actions"];
  dataSource:MatTableDataSource<Product>;
  selection = new SelectionModel<Product>(true, []);

  products:Product[] = [];
  isLoaded:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductService,
  ) { }

  ngOnInit(){
    new Promise((resolve, reject) =>{
      this.productService.getProducts()
      .subscribe(async data => {
        if(data.products){
          this.products = this.productService.getProductsMappedToModel(data.products);
          resolve(data);
        }
      }, err => {
        reject(err);
      });
    }).then((data) => {
      this.isLoaded = true;
      this.dataSource = new MatTableDataSource(this.products)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch((err) => {
      console.log(err);
      this.isLoaded = true;
      (err.status == 'error' && err.message != null)
      ? this.toastr.error(err.message)
      : this.toastr.error("Something went wrong. Please try again later");
    })
  }

  delete():void{
    if(this.selection.hasValue()){
      this.selection.selected.forEach((product) => {
        console.log(product);

        this.productService
          .deleteProduct(product)
          .subscribe(data => {
            if(data.status == 'success' && data.message != null){
              this.toastr.success(data.message);
            }
          }, err => {
            console.log(err);
            (err.status == 'error' && err.message != null)
            ? this.toastr.error(err.message)
            : this.toastr.error("Something went wrong. Please try again later");
          })
      });

      this.dataSource.data = this.dataSource.data.filter(product => !this.selection.selected.includes(product));
      this.selection.clear();
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if(this.dataSource){
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if(this.dataSource){
      this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
