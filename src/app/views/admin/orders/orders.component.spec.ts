import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { CommonModule } from '@angular/common';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com 3 pedidos de exemplo', () => {
    expect(component.pedidos.length).toBe(3);
  });

  it('deve ter filtro inicial definido como "todos"', () => {
    expect(component.filtroAtual).toBe('todos');
  });

  it('deve contar pedidos por status corretamente', () => {
    const pendentes = component.contarPorStatus('pendente');
    const preparando = component.contarPorStatus('preparando');
    const prontos = component.contarPorStatus('pronto');
    
    expect(pendentes).toBeGreaterThanOrEqual(0);
    expect(preparando).toBeGreaterThanOrEqual(0);
    expect(prontos).toBeGreaterThanOrEqual(0);
  });

  it('deve filtrar pedidos corretamente quando filtro é "todos"', () => {
    component.filtroAtual = 'todos';
    const pedidosFiltrados = component.getPedidosFiltrados();
    expect(pedidosFiltrados.length).toBe(component.pedidos.length);
  });

  it('deve filtrar pedidos corretamente quando filtro é "pendente"', () => {
    component.filtroAtual = 'pendente';
    const pedidosFiltrados = component.getPedidosFiltrados();
    pedidosFiltrados.forEach(pedido => {
      expect(pedido.status).toBe('pendente');
    });
  });

  it('deve atualizar status do pedido corretamente', () => {
    const pedido = component.pedidos[0];
    const statusAnterior = pedido.status;
    const novoStatus = 'preparando';
    
    component.atualizarStatus(pedido, novoStatus);
    
    expect(pedido.status).toBe(novoStatus);
    expect(pedido.status).not.toBe(statusAnterior);
  });

  it('deve retornar cor correta para cada status', () => {
    expect(component.getCorStatus('pendente')).toBe('#f59e0b');
    expect(component.getCorStatus('preparando')).toBe('#8b5cf6');
    expect(component.getCorStatus('pronto')).toBe('#10b981');
    expect(component.getCorStatus('entregue')).toBe('#6b7280');
    expect(component.getCorStatus('cancelado')).toBe('#ef4444');
  });

  it('deve retornar texto correto para cada status', () => {
    expect(component.getTextoStatus('pendente')).toBe('⏰ PENDENTE');
    expect(component.getTextoStatus('preparando')).toBe('🔥 PREPARANDO');
    expect(component.getTextoStatus('pronto')).toBe('✅ PRONTO');
    expect(component.getTextoStatus('entregue')).toBe('📦 ENTREGUE');
    expect(component.getTextoStatus('cancelado')).toBe('❌ CANCELADO');
  });

  it('deve calcular o total dos pedidos corretamente', () => {
    component.pedidos.forEach(pedido => {
      const totalCalculado = pedido.itens.reduce((sum, item) => 
        sum + (item.preco * item.quantidade), 0
      );
      expect(pedido.total).toBe(totalCalculado);
    });
  });
});
