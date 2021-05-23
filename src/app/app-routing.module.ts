import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { CustomerGuard } from './core/guards/customer.guard';
import { GuestAdminGuard } from './core/guards/guest-admin.guard';
import { GuestCustomerGuard } from './core/guards/guest-customer.guard';
import { AdminLoginComponent } from './modules/admin/admin-auth/admin-login/admin-login.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductCreateComponent } from './modules/admin/admin-product/admin-product-create/admin-product-create.component';
import { AdminProductListComponent } from './modules/admin/admin-product/admin-product-list/admin-product-list.component';
import { AdminProductUpdateComponent } from './modules/admin/admin-product/admin-product-update/admin-product-update.component';
import { TestComponent } from './modules/admin/test/test.component';
import { FrontLoginComponent } from './modules/front/front-auth/front-login/front-login.component';
import { FrontCustomerDashboardComponent } from './modules/front/front-customer/front-customer-dashboard/front-customer-dashboard.component';
import { FrontCustomerIndexComponent } from './modules/front/front-customer/front-customer-index/front-customer-index.component';
import { FrontCustomerOrderComponent } from './modules/front/front-customer/front-customer-order/front-customer-order.component';
import { FrontHomeComponent } from './modules/front/front-home/front-home.component';
import { FrontProductDetailComponent } from './modules/front/front-product/front-product-detail/front-product-detail.component';
import { Error404Component } from './shared/errors/error404/error404.component';

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },

  // Front routes
  {path: "", component: FrontHomeComponent},

  // Customer Routes
  {path: "customer/login", canActivate: [GuestCustomerGuard], component: FrontLoginComponent},

  // Customer Protected Routes
  { path: 'customer', canActivate: [CustomerGuard],  component:  FrontCustomerIndexComponent , children: [
      { path: "", redirectTo: "/customer/dashboard", pathMatch: "full" },
      { path: "dashboard", component:  FrontCustomerDashboardComponent},
      { path: "orders", component:  FrontCustomerOrderComponent},
    ]
  },

  {path: "p/:slug", component: FrontProductDetailComponent},

  // Admin Routes
  { path: 'admin/login', canActivate: [GuestAdminGuard], component:  AdminLoginComponent},

  // Admin Protected Routes
  { path: 'admin', canActivate: [AdminGuard], children: [
    { path: "", redirectTo: "/admin/dashboard", pathMatch: "full" },
      { path: "dashboard", component:  AdminDashboardComponent},
      { path: "products", component:  AdminProductListComponent},
      { path: "product", children: [
        { path: "update/:id", component:  AdminProductUpdateComponent},
        { path: "create", component:  AdminProductCreateComponent},
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
