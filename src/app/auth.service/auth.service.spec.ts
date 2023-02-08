import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy };
  let originalTimeout:any;
  //let cookie : CookieService
  // beforeEach(() => { //TODO: Antes de cada it (prueba)
  //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  //   service = new AuthService(httpClientSpy as any);
  // })

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, CookieService],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    //service = new AuthService(httpClientSpy as any, cookie as any);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // it('Deberia retornar objecto usuario (Login Correcto)', (done: DoneFn) => {
  //   const mockUserCredentials = {
  //     //TODO: Exito!
  //     email: 'olivier@mail.com',
  //     password: 'bestPassw0rd',
  //   };
  //   const mockResultLogin = {
  //     accessToken: 'xxx.xxx.xxx',
  //     user: {
  //       id: 1,
  //       email: 'olivier@mail.com',
  //       rol: 'mesero',
  //     },
  //   };

  //   httpClientSpy.post.and.returnValue(of(mockResultLogin));
  //   const user = mockUserCredentials;

  //   service.login(user)
  //   .subscribe(result => {
  //     expect(result).toEqual(mockResultLogin);
  //     done();
  //   })
  // });
  // afterEach(function() {
  //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  // });
});
