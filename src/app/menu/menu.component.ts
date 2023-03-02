import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service/auth.service';
import { ProductsService } from '../products.service/products.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  products: any = [];
  p: number = 1;
  total: number = 0;
  
  constructor(private authService: AuthService, private productsService: ProductsService) { }

  ngOnInit(){
    this.showProductsDesayuno();
    this.showProductsComida();
   

  }
  
  showProductsDesayuno() {
    this.llamarDB('desayuno');
    //toDo codigo para Api
    // this.productsService.showProducts('desayuno').subscribe({
    //   next: (data: any) => {
    //     this.products = data;
    //     this.total = data.length;
       
    //     this.pageChangeEvent(1)
    //   }
    // })
  
  }

  showProductsComida() {

    this.llamarDB('comida');
    //toDo codigo para Api
    // this.productsService.showProducts('comida').subscribe({
    //   next: (data: any) => {
    //     this.products = data;
    //     this.total = data.length;
       
    //     this.pageChangeEvent(1)
    //   }
    // })
   
  }
pageChangeEvent(event: number){
    this.p = event;
   

}
llamarDB(tipo: string){
  this.productsService.showAllProducts().subscribe({
    next: (data: any) => {
      if(tipo === 'desayuno'){
        let item = data.products;
        
        let desayuno = item.filter((product: any) => product.type == "desayuno");
        
        this.products = desayuno;
        this.total = desayuno.length;
        this.pageChangeEvent(1)
      }else{
        let item = data.products;
        let comida= item.filter((product: any) => product.type == "comida");
        this.products = comida;
        this.total = comida.length;
        this.pageChangeEvent(1)
      }
    }
  })
}
  @Output() newItemEvent = new EventEmitter<number>();    
  onClickMe(comida: number) {
   
    this.newItemEvent.emit(comida);
  
      
    
  }
  arriba(){
    let main = document.querySelector('.menu');
    
  //main.scroll(0, 0);
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth',
    // });
    //document.body.scrollTop = 0;
  }
 
  
}
