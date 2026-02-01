import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-container">
      <h1>Configurações - Admin Cardápio Digital</h1>
      <div class="settings-content">
        <p>Bem-vindo ao painel administrativo!</p>
        <button (click)="onLogout()">Sair</button>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    .settings-content {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      background: #c82333;
    }
  `]
})
export class SettingsComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSettings();
  }

  async loadSettings() {
    try {
      const config = await this.firebaseService.obterConfig();
      console.log('Configuração carregada:', config);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  }

  async saveSettings() {
    try {
      const config = { /* some config */ };
      await this.firebaseService.atualizarConfig(config);
      console.log('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
