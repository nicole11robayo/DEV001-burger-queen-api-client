import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ProductsComponent,
    PageNotFoundComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
