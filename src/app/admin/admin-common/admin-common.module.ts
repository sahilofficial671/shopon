import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { MaterialModule } from 'src/app/Modules/material/material.module';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { AdminLoginComponent } from '../admin-auth/admin-login/admin-login.component';



@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminIndexComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,

    AdminAuthModule,
  ],
  exports: [
    AdminHeaderComponent,
    AdminIndexComponent,

    AdminAuthModule,
  ],
})
export class AdminCommonModule { }
