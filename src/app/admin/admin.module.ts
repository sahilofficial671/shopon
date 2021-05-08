import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../Modules/material/material.module';
import { AdminCommonModule } from './admin-common/admin-common.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,

    AdminAuthModule,
    AdminCommonModule,
  ],
  exports:[
    AdminAuthModule,
    AdminCommonModule,
  ]
})
export class AdminModule { }
