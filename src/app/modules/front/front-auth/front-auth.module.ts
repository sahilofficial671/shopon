import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontLoginComponent } from './front-login/front-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';



@NgModule({
  declarations: [
    FrontLoginComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FrontLoginComponent,
  ],
})
export class FrontAuthModule { }
