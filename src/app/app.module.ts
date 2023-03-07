import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CocinaComponent } from './cocina/cocina.component';
import { MenuComponent } from './menu/menu.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { AdminComponent } from './admin/admin.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalUsersComponent } from './modal-users/modal-users.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule


  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ProductsComponent,
    PageNotFoundComponent,
    NavbarComponent,
    CocinaComponent,
    MenuComponent,
    CuentaComponent,
    AdminComponent,
    ModalProductComponent,
    ModalUsersComponent,
  ],

  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
