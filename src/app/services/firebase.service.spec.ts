import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data from getData', () => {
    const data = service.getData();
    expect(data).toBeDefined();
    expect(typeof data).toBe('object');
  });

  it('should update config successfully', async () => {
    const config = { test: 'value' };
    await expectAsync(service.atualizarConfig(config)).toBeResolved();
  });
});
