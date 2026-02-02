import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseService]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve ter o método getData', () => {
    expect(service.getData).toBeDefined();
  });

  it('deve retornar um objeto ao chamar getData', () => {
    const result = service.getData();
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('deve ter o método atualizarConfig', () => {
    expect(service.atualizarConfig).toBeDefined();
  });

  it('deve atualizar configuração com sucesso', async () => {
    const config = { teste: 'valor' };
    await expectAsync(service.atualizarConfig(config)).toBeResolved();
  });

  it('deve aceitar qualquer tipo de configuração', async () => {
    const config1 = { chave: 'valor' };
    const config2 = { numero: 123 };
    const config3 = { array: [1, 2, 3] };

    await expectAsync(service.atualizarConfig(config1)).toBeResolved();
    await expectAsync(service.atualizarConfig(config2)).toBeResolved();
    await expectAsync(service.atualizarConfig(config3)).toBeResolved();
  });
});
