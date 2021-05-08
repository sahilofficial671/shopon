import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminIndexComponent } from './admin/admin-common/admin-index/admin-index.component';
import { FrontIndexComponent } from './front/front-common/front-index/front-index.component';

const routes: Routes = [
  // { path: "", redirectTo: "/", pathMatch: "full" },

  // Front routes
  {path: "", component: FrontIndexComponent},


  // Admin Routes
  {path: "admin", component: AdminIndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
