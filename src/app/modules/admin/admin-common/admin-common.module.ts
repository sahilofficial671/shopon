import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';



@NgModule({
  declarations: [
    AdminIndexComponent
  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule,
  ],
  exports: [
    RouterModule,
    AppRoutingModule,
    AdminIndexComponent
  ]
})
export class AdminCommonModule { }
