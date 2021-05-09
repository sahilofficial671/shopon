import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';



@NgModule({
  declarations: [
  
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminAuthModule,
  ],
  exports: [
    AdminAuthModule,
  ]
})
export class AdminModule { }
