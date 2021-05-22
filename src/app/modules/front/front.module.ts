import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontCommonModule } from './front-common/front-common.module';
import { FrontProductModule } from './front-product/front-product.module';
import { FrontIndexComponent } from './front-index/front-index.component';
import { FrontHomeComponent } from './front-home/front-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FrontIndexComponent,
    FrontHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FrontCommonModule,
    FrontProductModule,
  ],
  exports: [
    FrontIndexComponent,
    FrontCommonModule,
    FrontProductModule,
  ]
})
export class FrontModule { }
