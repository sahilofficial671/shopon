import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { FrontProductSliderComponent } from './front-product-slider/front-product-slider.component';
import { FrontProductSpecialComponent } from './front-product-special/front-product-special.component';
import { FrontProductDetailComponent } from './front-product-detail/front-product-detail.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { FrontProductCardComponent } from './front-product-card/front-product-card.component';


@NgModule({
  declarations: [
    FrontProductSliderComponent,
    FrontProductSpecialComponent,
    FrontProductDetailComponent,
    FrontProductCardComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    NgImageSliderModule,
  ],
  exports: [
    FrontProductSliderComponent,
    FrontProductCardComponent
  ]
})
export class FrontProductModule { }
