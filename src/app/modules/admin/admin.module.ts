import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TestComponent } from './test/test.component';
import { AdminCommonModule } from './admin-common/admin-common.module';
import { AdminProductModule } from './admin-product/admin-product.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    AdminAuthModule,
    AdminCommonModule,
    AdminProductModule,

    // For component directly inside this module
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminDashboardComponent,
    AdminAuthModule,
    AdminCommonModule,
    AdminProductModule,
  ]
})
export class AdminModule { }
