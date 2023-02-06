import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientTestingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ProductsComponent,
    PageNotFoundComponent,
    NavbarComponent,
    MenuComponent,
    AlertComponent,
   
  ],
  
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
