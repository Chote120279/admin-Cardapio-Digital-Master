
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ItemPedido {
  nome: string;
  quantidade: number;
  preco: number;
  tamanho?: string;
}

interface Pedido {
  numero: number;
  cliente: string;
  telefone: string;
  itens: ItemPedido[];
  total: number;
  status: 'pendente' | 'preparando' | 'pronto' | 'entregue' | 'cancelado';
  data: Date;
  observacao?: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="background: #f3f4f6; min-height: 100vh; padding: 2rem;">
      <div style="max-width: 1400px; margin: 0 auto;">
        
        <div style="background: white; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h1 style="font-size: 2.5rem; font-weight: bold; color: #111827; margin-bottom: 0.5rem;">
            📦 Pedidos
          </h1>
          <p style="color: #6b7280; font-size: 1.125rem;">
            Gerencie todos os pedidos do restaurante
          </p>
        </div>

        <div style="background: white; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;">
            
            <button (click)="filtroAtual = 'todos'" 
                    [style.background]="filtroAtual === 'todos' ? '#3b82f6' : '#f3f4f6'"
                    [style.color]="filtroAtual === 'todos' ? 'white' : '#6b7280'"
                    style="padding: 1rem; border: none; border-radius: 0.75rem; cursor: pointer; font-weight: 700;">
              <div style="font-size: 1.5rem;">📊</div>
              <div style="font-size: 1.25rem;">{{ pedidos.length }}</div>
              <div style="font-size: 0.75rem;">Todos</div>
            </button>

            <button (click)="filtroAtual = 'pendente'" 
                    [style.background]="filtroAtual === 'pendente' ? '#f59e0b' : '#fef3c7'"
                    [style.color]="filtroAtual === 'pendente' ? 'white' : '#92400e'"
                    style="padding: 1rem; border: none; border-radius: 0.75rem; cursor: pointer; font-weight: 700;">
              <div style="font-size: 1.5rem;">⏰</div>
              <div style="font-size: 1.25rem;">{{ contarPorStatus('pendente') }}</div>
              <div style="font-size: 0.75rem;">Pendentes</div>
            </button>

            <button (click)="filtroAtual = 'preparando'" 
                    [style.background]="filtroAtual === 'preparando' ? '#8b5cf6' : '#ede9fe'"
                    [style.color]="filtroAtual === 'preparando' ? 'white' : '#5b21b6'"
                    style="padding: 1rem; border: none; border-radius: 0.75rem; cursor: pointer; font-weight: 700;">
              <div style="font-size: 1.5rem;">🔥</div>
              <div style="font-size: 1.25rem;">{{ contarPorStatus('preparando') }}</div>
              <div style="font-size: 0.75rem;">Preparando</div>
            </button>

            <button (click)="filtroAtual = 'pronto'" 
                    [style.background]="filtroAtual === 'pronto' ? '#10b981' : '#d1fae5'"
                    [style.color]="filtroAtual === 'pronto' ? 'white' : '#065f46'"
                    style="padding: 1rem; border: none; border-radius: 0.75rem; cursor: pointer; font-weight: 700;">
              <div style="font-size: 1.5rem;">✅</div>
              <div style="font-size: 1.25rem;">{{ contarPorStatus('pronto') }}</div>
              <div style="font-size: 0.75rem;">Prontos</div>
            </button>

          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem;">
          
          <div *ngFor="let pedido of getPedidosFiltrados()" 
               style="background: white; border-radius: 1rem; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            
            <div [style.background]="getCorStatus(pedido.status)"
                 style="padding: 1.5rem; color: white;">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <div style="font-size: 2rem; font-weight: bold;">#{{ pedido.numero }}</div>
                  <div style="font-size: 0.875rem; margin-top: 0.5rem;">
                    🕒 {{ pedido.data | date:'dd/MM/yyyy HH:mm' }}
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 1.75rem; font-weight: bold;">R$ {{ pedido.total.toFixed(2) }}</div>
                  <div style="background: rgba(0,0,0,0.2); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; margin-top: 0.5rem;">
                    {{ getTextoStatus(pedido.status) }}
                  </div>
                </div>
              </div>
            </div>

            <div style="padding: 1.5rem;">
              
              <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 2px solid #f3f4f6;">
                <div style="font-weight: 700; color: #111827; font-size: 1.125rem;">{{ pedido.cliente }}</div>
                <div style="color: #6b7280; font-size: 0.875rem;">📱 {{ pedido.telefone }}</div>
              </div>

              <div style="margin-bottom: 1rem;">
                <div *ngFor="let item of pedido.itens" 
                     style="display: flex; justify-content: space-between; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem; margin-bottom: 0.5rem;">
                  <div>
                    <span style="font-weight: 700; color: #ef4444;">{{ item.quantidade }}x</span>
                    <span style="color: #111827; margin-left: 0.5rem;">{{ item.nome }}</span>
                    <div *ngIf="item.tamanho" style="color: #9ca3af; font-size: 0.75rem;">{{ item.tamanho }}</div>
                  </div>
                  <div style="font-weight: 700; color: #059669;">R$ {{ (item.preco * item.quantidade).toFixed(2) }}</div>
                </div>
              </div>

              <div *ngIf="pedido.observacao" 
                   style="background: #fef3c7; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                <div style="font-weight: 700; color: #92400e; font-size: 0.875rem;">📝 Observação</div>
                <div style="color: #78350f; font-size: 0.875rem;">{{ pedido.observacao }}</div>
              </div>

              <div style="display: flex; gap: 0.5rem;">
                <button *ngIf="pedido.status === 'pendente'" 
                        (click)="atualizarStatus(pedido, 'preparando')"
                        style="flex: 1; background: #8b5cf6; color: white; padding: 0.75rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 700;">
                  🔥 Iniciar
                </button>
                <button *ngIf="pedido.status === 'preparando'" 
                        (click)="atualizarStatus(pedido, 'pronto')"
                        style="flex: 1; background: #10b981; color: white; padding: 0.75rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 700;">
                  ✅ Pronto
                </button>
                <button *ngIf="pedido.status === 'pronto'" 
                        (click)="atualizarStatus(pedido, 'entregue')"
                        style="flex: 1; background: #6b7280; color: white; padding: 0.75rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 700;">
                  📦 Entregar
                </button>
                <button *ngIf="pedido.status !== 'cancelado'"
                        (click)="atualizarStatus(pedido, 'cancelado')"
                        style="background: #ef4444; color: white; padding: 0.75rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer;">
                  ❌
                </button>
              </div>

            </div>

          </div>

        </div>

        <div *ngIf="getPedidosFiltrados().length === 0" 
             style="background: white; border-radius: 1rem; padding: 4rem; text-align: center;">
          <div style="font-size: 6rem; opacity: 0.3;">📦</div>
          <h3 style="font-size: 2rem; font-weight: bold; color: #111827;">Nenhum pedido</h3>
          <p style="color: #6b7280;">Os pedidos aparecerão aqui</p>
        </div>

      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  pedidos: Pedido[] = [];
  filtroAtual = 'todos';

  ngOnInit() {
    this.pedidos = [
      {
        numero: 1,
        cliente: 'João Silva',
        telefone: '(11) 98765-4321',
        itens: [
          { nome: 'PASTEL CARNE', quantidade: 2, preco: 8.00, tamanho: 'Grande' },
          { nome: 'Coca-Cola', quantidade: 1, preco: 5.00, tamanho: 'Lata' }
        ],
        total: 21.00,
        status: 'pendente',
        data: new Date(),
        observacao: 'Sem cebola'
      },
      {
        numero: 2,
        cliente: 'Maria Santos',
        telefone: '(11) 91234-5678',
        itens: [{ nome: 'Espeto', quantidade: 3, preco: 12.00, tamanho: 'Médio' }],
        total: 36.00,
        status: 'preparando',
        data: new Date()
      },
      {
        numero: 3,
        cliente: 'Carlos Souza',
        telefone: '(11) 99999-8888',
        itens: [
          { nome: 'PASTEL CARNE', quantidade: 1, preco: 8.00, tamanho: 'Grande' },
          { nome: 'Espeto', quantidade: 2, preco: 12.00, tamanho: 'Médio' }
        ],
        total: 32.00,
        status: 'pronto',
        data: new Date()
      }
    ];
  }

  contarPorStatus(status: string): number {
    return this.pedidos.filter(p => p.status === status).length;
  }

  getPedidosFiltrados(): Pedido[] {
    if (this.filtroAtual === 'todos') return this.pedidos;
    return this.pedidos.filter(p => p.status === this.filtroAtual);
  }

  atualizarStatus(pedido: Pedido, novoStatus: any) {
    pedido.status = novoStatus;
  }

  getCorStatus(status: string): string {
    const cores: any = {
      'pendente': '#f59e0b',
      'preparando': '#8b5cf6',
      'pronto': '#10b981',
      'entregue': '#6b7280',
      'cancelado': '#ef4444'
    };
    return cores[status];
  }

  getTextoStatus(status: string): string {
    const textos: any = {
      'pendente': '⏰ PENDENTE',
      'preparando': '🔥 PREPARANDO',
      'pronto': '✅ PRONTO',
      'entregue': '📦 ENTREGUE',
      'cancelado': '❌ CANCELADO'
    };
    return textos[status];
  }
}
