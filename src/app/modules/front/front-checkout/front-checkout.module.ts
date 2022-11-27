import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontCartComponent } from './front-cart/front-cart.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FrontProductModule } from '../front-product/front-product.module';

@NgModule({
  declarations: [
    FrontCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FrontProductModule
  ]
})
export class FrontCheckoutModule { }
