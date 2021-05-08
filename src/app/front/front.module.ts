import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontCommonModule } from './front-common/front-common.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FrontCommonModule,
  ],
  exports: [
    FrontCommonModule,
  ]
})
export class FrontModule { }
