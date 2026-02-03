import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="display: flex; min-height: 100vh; background: #f3f4f6;">
      <!-- Sidebar -->
      <aside [class.collapsed]="isSidebarCollapsed"
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    transition: width 0.3s ease; overflow: hidden;"
             [style.width]="isSidebarCollapsed ? '80px' : '280px'">
        
        <!-- Header -->
        <div style="padding: 2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 48px; height: 48px; background: white; border-radius: 12px; 
                        display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              🍽️
            </div>
            <div *ngIf="!isSidebarCollapsed" style="color: white;">
              <h1 style="font-size: 1.25rem; font-weight: bold; margin: 0;">Cardápio Digital</h1>
              <p style="font-size: 0.75rem; opacity: 0.8; margin: 0;">Admin Panel</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav style="padding: 1.5rem 0;">
          <a routerLink="/admin/products" 
             routerLinkActive="active"
             [class.collapsed]="isSidebarCollapsed"
             class="nav-link"
             style="display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; 
                    color: rgba(255,255,255,0.8); text-decoration: none; transition: all 0.2s;
                    border-left: 4px solid transparent;">
            <span style="font-size: 1.5rem; min-width: 24px;">🍕</span>
            <span *ngIf="!isSidebarCollapsed" style="font-weight: 600;">Produtos</span>
          </a>

          <a routerLink="/admin/categories" 
             routerLinkActive="active"
             [class.collapsed]="isSidebarCollapsed"
             class="nav-link"
             style="display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; 
                    color: rgba(255,255,255,0.8); text-decoration: none; transition: all 0.2s;
                    border-left: 4px solid transparent;">
            <span style="font-size: 1.5rem; min-width: 24px;">📁</span>
            <span *ngIf="!isSidebarCollapsed" style="font-weight: 600;">Categorias</span>
          </a>

          <a routerLink="/admin/orders" 
             routerLinkActive="active"
             [class.collapsed]="isSidebarCollapsed"
             class="nav-link"
             style="display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; 
                    color: rgba(255,255,255,0.8); text-decoration: none; transition: all 0.2s;
                    border-left: 4px solid transparent;">
            <span style="font-size: 1.5rem; min-width: 24px;">📦</span>
            <span *ngIf="!isSidebarCollapsed" style="font-weight: 600;">Pedidos</span>
          </a>

          <a routerLink="/admin/settings" 
             routerLinkActive="active"
             [class.collapsed]="isSidebarCollapsed"
             class="nav-link"
             style="display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; 
                    color: rgba(255,255,255,0.8); text-decoration: none; transition: all 0.2s;
                    border-left: 4px solid transparent;">
            <span style="font-size: 1.5rem; min-width: 24px;">⚙️</span>
            <span *ngIf="!isSidebarCollapsed" style="font-weight: 600;">Configurações</span>
          </a>
        </nav>

        <!-- Toggle Button -->
        <div style="position: absolute; bottom: 1.5rem; left: 0; right: 0; padding: 0 1.5rem;">
          <button (click)="toggleSidebar()"
                  style="width: 100%; background: rgba(255,255,255,0.1); color: white; 
                         border: none; padding: 0.75rem; border-radius: 8px; cursor: pointer;
                         font-weight: 600; transition: all 0.2s;">
            {{ isSidebarCollapsed ? '→' : '←' }}
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main style="flex: 1; overflow-y: auto;">
        <router-outlet></router-outlet>
      </main>
    </div>

    <style>
      .nav-link:hover {
        background: rgba(255,255,255,0.1) !important;
        color: white !important;
      }
      
      .nav-link.active {
        background: rgba(255,255,255,0.15) !important;
        color: white !important;
        border-left-color: white !important;
      }

      .nav-link.collapsed {
        justify-content: center;
        padding: 1rem 0 !important;
      }
    </style>
  `
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
