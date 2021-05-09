import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    AdminAuthModule,
  ],
  exports: [
    AdminDashboardComponent,
    AdminAuthModule,
  ]
})
export class AdminModule { }
