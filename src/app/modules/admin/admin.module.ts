import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TestComponent } from './test/test.component';
import { AdminCommonModule } from './admin-common/admin-common.module';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    AdminAuthModule,
    AdminCommonModule,
  ],
  exports: [
    AdminDashboardComponent,
    AdminAuthModule,
    AdminCommonModule,
  ]
})
export class AdminModule { }
