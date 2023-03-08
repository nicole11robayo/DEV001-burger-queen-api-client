//import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthService } from '../auth.service/auth.service';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  const mockResultLogin = {
    accessToken: 'xxx.xxx.xxx',
    user: {
      id: 1,
      email: 'olivier@mail.com',
      rol: 'mesero',
    },
  };
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService : AuthService


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule],
      providers: [ AuthComponent, AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the button', () => {
    const compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button[type="submit"]')).toBeDefined();
  });
  it('Debe retornar formulario invalido', () => {
    const app = fixture.componentInstance
    const email = app.loginForm.controls['email'];
    email.setValue('camila01@gmail.com')
    expect(app.loginForm.invalid).toBeTrue();
  });
  it('Debe retornar formulario valido', () => {
    const app = fixture.componentInstance
    const email = app.loginForm.controls['email'];
    const password = app.loginForm.controls['password']
    email.setValue('camila01@gmail.com')
    password.setValue('123456')
    expect(app.loginForm.invalid).toBeFalse();
  });
 
});
