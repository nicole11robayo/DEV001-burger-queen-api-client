import { Component , OnInit} from '@angular/core';
import { AuthService } from '../auth.service/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private authService: AuthService ){}
  ngOnInit() {
    this.getUserLogged();
   
  }
  getUserLogged() {
    //toDo cambiar a consulta por token
    const token = this.authService.getUserLogged()
    //console.log(this.authService.getUserLogged())
    this.authService.getUser(token).subscribe(user => {
      console.log(user);
    });
  }
}