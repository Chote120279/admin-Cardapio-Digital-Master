import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig, Theme, DEFAULT_CONFIG } from '../models/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config$ = new BehaviorSubject<AppConfig>(DEFAULT_CONFIG);
  private readonly STORAGE_KEY = 'app_config';

  constructor() {
    this.loadFromLocalStorage();
    this.applyTheme(this.config$.value.tema);
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.config$.next(parsed);
        console.log('✅ Configurações carregadas do localStorage');
      } catch (e) {
        console.error('❌ Erro ao carregar configurações:', e);
      }
    }
  }

  getConfig(): Observable<AppConfig> {
    return this.config$.asObservable();
  }

  getConfigValue(): AppConfig {
    return this.config$.value;
  }

  updateConfig(config: AppConfig): void {
    this.config$.next(config);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
    this.applyTheme(config.tema);
    console.log('✅ Configurações salvas');
  }

  getTheme(): Observable<Theme> {
    return new Observable(observer => {
      this.config$.subscribe(config => {
        observer.next(config.tema);
      });
    });
  }

  applyTheme(theme: Theme): void {
    const root = document.documentElement;
    root.style.setProperty('--cor-primaria', theme.corPrimaria);
    root.style.setProperty('--cor-secundaria', theme.corSecundaria);
    root.style.setProperty('--cor-destaque', theme.corDestaque);
    root.style.setProperty('--cor-texto', theme.corTexto);
    root.style.setProperty('--cor-fundo', theme.corFundo);
    root.style.setProperty('--cor-texto-secundario', theme.corTextoSecundario);
    console.log('🎨 Tema aplicado:', theme.nome);
  }

  resetToDefault(): void {
    this.updateConfig(DEFAULT_CONFIG);
    console.log('🔄 Configurações resetadas para padrão');
  }
}
