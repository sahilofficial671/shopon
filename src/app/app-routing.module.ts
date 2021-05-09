import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './core/guards/admin-auth.guard';
import { GuestAdminGuard } from './core/guards/guest-admin.guard';
import { AdminLoginComponent } from './modules/admin/admin-auth/admin-login/admin-login.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';
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
    path: 'admin', canActivate: [AdminAuthGuard], children: [
      { path: "", component:  Error404Component},
      { path: "dashboard", component:  AdminDashboardComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
