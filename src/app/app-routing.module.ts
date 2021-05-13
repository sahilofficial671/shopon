import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { GuestAdminGuard } from './core/guards/guest-admin.guard';
import { AdminLoginComponent } from './modules/admin/admin-auth/admin-login/admin-login.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductListComponent } from './modules/admin/admin-product/admin-product-list/admin-product-list.component';
import { AdminProductUpdateComponent } from './modules/admin/admin-product/admin-product-update/admin-product-update.component';
import { TestComponent } from './modules/admin/test/test.component';
import { FrontIndexComponent } from './modules/front/front-common/front-index/front-index.component';
import { Error404Component } from './shared/errors/error404/error404.component';

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },

  // Front routes
  {path: "", component: FrontIndexComponent},

  // Admin Routes
  {
    path: 'admin', canActivate: [GuestAdminGuard], children: [
      { path: "login", component:  AdminLoginComponent},
    ]
  },

  // Admin Protected Routes
  {
    path: 'admin', canActivate: [AdminGuard], children: [
      { path: "dashboard", component:  AdminDashboardComponent},
      { path: "products", children: [
        { path: "list", component:  AdminProductListComponent},
        { path: ":id", component:  AdminProductUpdateComponent},
      ]},
    ]
  },

  { path: "**", component:  Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
