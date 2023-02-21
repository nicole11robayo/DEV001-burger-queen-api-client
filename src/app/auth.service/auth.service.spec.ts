import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService, CookieService],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post' ]);
    const cookies = {}
    service = new AuthService(httpClientSpy as any, cookies as any);
    //service = TestBed.inject(AuthService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Deberia retornar objecto usuario (Login Correcto)', (done: DoneFn) => {
    const mockUserCredentials = {
     
      email: 'olivier@mail.com',
      password: 'bestPassw0rd',
    };
    const mockResultLogin = {
      accessToken: 'xxx.xxx.xxx',
      user: {
        id: 1,
        email: 'olivier@mail.com',
        rol: 'mesero',
      },
    };

    httpClientSpy.post.and.returnValue(of(mockResultLogin));
    const user = mockUserCredentials;

    service.login(user)
    .subscribe({
      next: (result) => {
        expect(result).toEqual(mockResultLogin);
        done();
      }
    })

  });
 
});
