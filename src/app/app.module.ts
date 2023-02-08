import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';



import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CocinaComponent } from './cocina/cocina.component';
import { MenuComponent } from './menu/menu.component';
import { CuentaComponent } from './cuenta/cuenta.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
   
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
   
  ],
  
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
