import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';
import { ProductsService } from '../products.service/products.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  products: any = [];


  constructor(private authService: AuthService, private productsService: ProductsService) { }

  ngOnInit(){
    this.showProductsDesayuno();
    this.onClickMe2();
  }

  showProductsDesayuno() {
    this.productsService.showProducts().subscribe((data: any) => {
      let desayuno = data.filter((product: any) => product.type === "desayuno")

      //let showDesayuno = desayuno.map((des:any) => JSON.stringify(des))
      //console.log(showDesayuno);
      this.products = desayuno;
    });
    //this.router.navigateByUrl('/products')
  }

  showProductsComida() {
    this.productsService.showProducts().subscribe((data: any) => {
      let comida = data.filter((product: any) => product.type === "comida")

      //let showDesayuno = desayuno.map((des:any) => JSON.stringify(des))
      //console.log(showDesayuno);
      this.products = comida;
    });
  }

  onClickMe(comida: number) {

    this.productsService.getProductClick(comida);
      
 
  }

  onClickMe2() {

    this.productsService.getProductItem().then((productos)=>{
      console.log(productos);
    })


    
  }

  
}
