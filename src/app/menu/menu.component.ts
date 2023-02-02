import { Component } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  products:any =[];

  constructor(private authService: AuthService) {}

  showProductsDesayuno() {
    this.authService.showProducts().subscribe( (data: any) => {
      let desayuno = data.filter((product: any) => product.type === "desayuno")

      //let showDesayuno = desayuno.map((des:any) => JSON.stringify(des))
      //console.log(showDesayuno);
      this.products= desayuno;
    });
    //this.router.navigateByUrl('/products')
  }

  showProductsComida() {
    this.authService.showProducts().subscribe( (data: any) => {
      let comida = data.filter((product: any) => product.type === "comida")

      //let showDesayuno = desayuno.map((des:any) => JSON.stringify(des))
      //console.log(showDesayuno);
      this.products= comida;
    });
    //this.router.navigateByUrl('/products')
  }
}
