import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { RouterModule } from '@angular/router';
import { FrontCategoryDetailComponent } from './front-category-detail/front-category-detail.component';



@NgModule({
  declarations: [
    FrontCategoryDetailComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ]
})
export class FrontCategoryModule { }
