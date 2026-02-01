import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-container">
      <div class="header">
        <h1>Painel Administrativo - Cardápio Digital</h1>
        <button class="btn-logout" (click)="onLogout()">Sair</button>
      </div>
      
      <div class="admin-menu">
        <div class="menu-card" (click)="goToProdutos()">
          <div class="menu-icon">📦</div>
          <h3>Gerenciar Produtos</h3>
          <p>Cadastre, edite e gerencie todos os produtos do cardápio</p>
        </div>
        
        <div class="menu-card" (click)="goToSettings()">
          <div class="menu-icon">⚙️</div>
          <h3>Configurações</h3>
          <p>Ajuste as configurações do sistema</p>
        </div>
        
        <div class="menu-card">
          <div class="menu-icon">📊</div>
          <h3>Relatórios</h3>
          <p>Visualize estatísticas e relatórios</p>
          <span class="badge-soon">Em breve</span>
        </div>
        
        <div class="menu-card">
          <div class="menu-icon">👥</div>
          <h3>Usuários</h3>
          <p>Gerencie usuários e permissões</p>
          <span class="badge-soon">Em breve</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #eee;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
      color: #333;
    }

    .btn-logout {
      padding: 10px 24px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .btn-logout:hover {
      background: #c82333;
    }

    .admin-menu {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .menu-card {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .menu-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .menu-card:has(.badge-soon) {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .menu-card:has(.badge-soon):hover {
      transform: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .menu-icon {
      font-size: 48px;
      margin-bottom: 15px;
    }

    .menu-card h3 {
      margin: 0 0 10px 0;
      font-size: 20px;
      color: #333;
    }

    .menu-card p {
      margin: 0;
      color: #666;
      font-size: 14px;
      line-height: 1.5;
    }

    .badge-soon {
      position: absolute;
      top: 15px;
      right: 15px;
      background: #ffc107;
      color: #333;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .admin-menu {
        grid-template-columns: 1fr;
      }

      .header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }

      .btn-logout {
        width: 100%;
      }
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

  goToProdutos() {
    this.router.navigate(['/admin/produtos']);
  }

  goToSettings() {
    // Stay on this page or navigate to a dedicated settings page
    console.log('Settings clicked');
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
