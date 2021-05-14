import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TestComponent } from './test/test.component';
import { AdminCommonModule } from './admin-common/admin-common.module';
import { AdminProductModule } from './admin-product/admin-product.module';



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
  ],
  exports: [
    AdminDashboardComponent,
    AdminAuthModule,
    AdminCommonModule,
    AdminProductModule,
  ]
})
export class AdminModule { }
