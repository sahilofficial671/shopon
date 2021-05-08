import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontHeaderComponent } from './front-header/front-header.component';
import { FrontIndexComponent } from './front-index/front-index.component';
import { MaterialModule } from 'src/app/Modules/material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';



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
