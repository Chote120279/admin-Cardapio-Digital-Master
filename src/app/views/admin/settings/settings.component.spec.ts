import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { FirebaseService } from '../../../services/firebase.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;

  beforeEach(async () => {
    const firebaseSpyObj = jasmine.createSpyObj('FirebaseService', ['atualizarConfig']);
    firebaseSpyObj.atualizarConfig.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [
        { provide: FirebaseService, useValue: firebaseSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    firebaseServiceSpy = TestBed.inject(FirebaseService) as jasmine.SpyObj<FirebaseService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter o método saveSettings', () => {
    expect(component.saveSettings).toBeDefined();
  });

  it('deve chamar atualizarConfig ao salvar configurações', async () => {
    await component.saveSettings();

    expect(firebaseServiceSpy.atualizarConfig).toHaveBeenCalled();
  });
});
