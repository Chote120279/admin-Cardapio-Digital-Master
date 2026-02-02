import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth-guard.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpyObj }
      ]
    });
    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve ter o método canActivate', () => {
    expect(service.canActivate).toBeDefined();
  });

  it('deve ter o método logado', () => {
    expect(service.logado).toBeDefined();
  });

  it('deve retornar Promise<boolean> ao chamar canActivate', async () => {
    const result = service.canActivate();
    expect(result instanceof Promise).toBe(true);
    const booleanResult = await result;
    expect(typeof booleanResult).toBe('boolean');
  });

  it('deve retornar Promise<boolean> ao chamar logado', async () => {
    const result = service.logado();
    expect(result instanceof Promise).toBe(true);
    const booleanResult = await result;
    expect(typeof booleanResult).toBe('boolean');
  });

  it('deve redirecionar para login quando não está logado', async () => {
    spyOn(service, 'logado').and.returnValue(Promise.resolve(false));
    
    const result = await service.canActivate();
    
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deve permitir acesso quando está logado', async () => {
    spyOn(service, 'logado').and.returnValue(Promise.resolve(true));
    
    const result = await service.canActivate();
    
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('por padrão, deve retornar true (usuário autenticado)', async () => {
    const result = await service.logado();
    expect(result).toBe(true);
  });
});
