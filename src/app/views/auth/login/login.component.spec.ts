import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { FirebaseService } from '../../../services/firebase.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const firebaseSpyObj = jasmine.createSpyObj('FirebaseService', ['atualizarConfig']);
    firebaseSpyObj.atualizarConfig.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: FirebaseService, useValue: firebaseSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    firebaseServiceSpy = TestBed.inject(FirebaseService) as jasmine.SpyObj<FirebaseService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter o método login', () => {
    expect(component.login).toBeDefined();
  });

  it('deve chamar atualizarConfig e navegar para admin ao fazer login', async () => {
    await component.login();

    expect(firebaseServiceSpy.atualizarConfig).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin']);
  });
});
