import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthComponent } from './auth.component';
//import { AuthService } from '../auth.service/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ AuthComponent, ReactiveFormsModule ]
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
  // it('should detect form is valid', () => {
  //   fixture.nativeElement.querySelector('button').click();

  //   expect(component.login()).toEqual();
  // });

});
