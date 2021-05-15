import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { AdminProductUpdateComponent } from './admin-product-update/admin-product-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminProductListComponent,
    AdminProductUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminProductListComponent,
    AdminProductUpdateComponent
  ]
})

export class AdminProductModule { }
