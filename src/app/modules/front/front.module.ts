import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontCommonModule } from './front-common/front-common.module';
import { FrontProductModule } from './front-product/front-product.module';
import { FrontIndexComponent } from './front-index/front-index.component';
import { FrontHomeComponent } from './front-home/front-home.component';
import { RouterModule } from '@angular/router';
import { FrontAuthModule } from './front-auth/front-auth.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FrontCustomerModule } from './front-customer/front-customer.module';
import { FrontCheckoutModule } from './front-checkout/front-checkout.module';
import { FrontCategoryModule } from './front-category/front-category.module';

@NgModule({
  declarations: [
    FrontIndexComponent,
    FrontHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,

    FrontCommonModule,
    FrontProductModule,
    FrontCategoryModule,
    FrontCustomerModule,
    FrontAuthModule,
    FrontCheckoutModule
  ],
  exports: [
    FrontIndexComponent,
  ]
})
export class FrontModule { }
