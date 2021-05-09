import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontHeaderComponent } from './front-header/front-header.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { FrontIndexComponent } from './front-index/front-index.component';


@NgModule({
  declarations: [
    FrontHeaderComponent,
    FrontIndexComponent
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
    FrontHeaderComponent,
    FrontIndexComponent
  ]
})
export class FrontCommonModule { }
