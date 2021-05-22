import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontHeaderComponent } from './front-header/front-header.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FrontHeaderComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
  ],
  exports: [
    FrontHeaderComponent,
  ]
})
export class FrontCommonModule { }
