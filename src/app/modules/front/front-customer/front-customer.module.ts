import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontCustomerOrderComponent } from './front-customer-order/front-customer-order.component';
import { FrontCustomerIndexComponent } from './front-customer-index/front-customer-index.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FrontCustomerDashboardComponent } from './front-customer-dashboard/front-customer-dashboard.component';



@NgModule({
  declarations: [
    FrontCustomerOrderComponent,
    FrontCustomerIndexComponent,
    FrontCustomerDashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FrontCustomerOrderComponent,
    FrontCustomerIndexComponent,
    FrontCustomerDashboardComponent,
  ]
})
export class FrontCustomerModule { }
