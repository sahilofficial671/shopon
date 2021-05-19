import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { AdminProductUpdateComponent } from './admin-product-update/admin-product-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProductCreateComponent } from './admin-product-create/admin-product-create.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AdminProductListComponent,
    AdminProductUpdateComponent,
    AdminProductCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ImagekitioAngularModule.forRoot({
      publicKey: "public_GWTw+oFONUB4JSW7wrc1ADXTmHE=",
      urlEndpoint : "https://ik.imagekit.io/webiggle/",
      authenticationEndpoint: "https://secure.webiggle.com/imagekit/auth"
    })
  ],
  exports: [
    AdminProductListComponent,
    AdminProductUpdateComponent
  ]
})

export class AdminProductModule { }
