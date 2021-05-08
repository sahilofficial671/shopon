import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material/material.module';
import { AdminModule } from './admin/admin.module';
import { FrontModule } from './front/front.module';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FrontModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    AppRoutingModule,
    MaterialModule,
    FrontModule,
    AdminModule,
  ]
})
export class AppModule { }
