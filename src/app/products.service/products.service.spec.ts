import { HttpClientModule } from '@angular/common/http';
//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'app/auth.service/auth.service';

import { ProductsService } from '../products.service/products.service';

describe('ProductsService', () => {
 let service: ProductsService;
  beforeEach(() => {
   
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductsService, AuthService],
    });
   service = TestBed.inject(ProductsService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
