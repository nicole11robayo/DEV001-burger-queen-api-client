import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { CocinaComponent} from './cocina/cocina.component';
import { ProductsComponent } from './products/products.component';
import { CocinaComponent } from './cocina/cocina.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PermisosGuard } from './guards/permisos.guard';
import { AdminGuard } from './guards/admin.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'orders', component: CocinaComponent },
  { path: 'admin', component: AdminComponent ,canActivate: [AdminGuard] },
  { path: 'products', component: ProductsComponent ,canActivate: [PermisosGuard] },
  { path: 'cocina', component: CocinaComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
