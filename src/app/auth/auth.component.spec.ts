//import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AuthComponent } from './auth.component';
//import { AuthService } from '../auth.service/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        ReactiveFormsModule,
        FormsModule],
      providers: [ AuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
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
