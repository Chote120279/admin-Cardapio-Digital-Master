import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService, Produto } from '../../../services/produto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produtos',
  template: `
    <div class="produtos-container">
      <div class="header">
        <h1>Gerenciar Produtos</h1>
        <button class="btn-primary" (click)="novoProduto()">+ Novo Produto</button>
      </div>

      <div class="filters">
        <input 
          type="text" 
          placeholder="Buscar produto..." 
          [(ngModel)]="searchTerm"
          (input)="filtrarProdutos()"
          class="search-input"
        >
        <select [(ngModel)]="categoriaFiltro" (change)="filtrarProdutos()" class="category-filter">
          <option value="">Todas as Categorias</option>
          <option value="entrada">Entradas</option>
          <option value="principal">Pratos Principais</option>
          <option value="bebida">Bebidas</option>
          <option value="sobremesa">Sobremesas</option>
        </select>
      </div>

      <div class="produtos-grid" *ngIf="produtosFiltrados.length > 0">
        <div class="produto-card" *ngFor="let produto of produtosFiltrados">
          <div class="produto-image" [style.background-image]="'url(' + produto.imagemUrl + ')'">
            <span class="badge" [class.disponivel]="produto.disponivel" [class.indisponivel]="!produto.disponivel">
              {{ produto.disponivel ? 'Disponível' : 'Indisponível' }}
            </span>
          </div>
          <div class="produto-info">
            <h3>{{ produto.nome }}</h3>
            <p class="descricao">{{ produto.descricao }}</p>
            <p class="preco">R$ {{ produto.preco | number:'1.2-2' }}</p>
            <span class="categoria">{{ getCategoriaLabel(produto.categoria) }}</span>
          </div>
          <div class="produto-actions">
            <button class="btn-edit" (click)="editarProduto(produto.id)">Editar</button>
            <button class="btn-toggle" (click)="toggleDisponibilidade(produto)">
              {{ produto.disponivel ? 'Desativar' : 'Ativar' }}
            </button>
            <button class="btn-delete" (click)="deletarProduto(produto.id)">Excluir</button>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="produtosFiltrados.length === 0">
        <p>Nenhum produto encontrado.</p>
      </div>
    </div>
  `,
  styles: [`
    .produtos-container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
    }

    .btn-primary {
      padding: 12px 24px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
    }

    .btn-primary:hover {
      background: #218838;
    }

    .filters {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
    }

    .search-input, .category-filter {
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .search-input {
      flex: 1;
    }

    .category-filter {
      min-width: 200px;
    }

    .produtos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .produto-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .produto-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .produto-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      background-color: #f5f5f5;
      position: relative;
    }

    .badge {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .badge.disponivel {
      background: #28a745;
      color: white;
    }

    .badge.indisponivel {
      background: #dc3545;
      color: white;
    }

    .produto-info {
      padding: 15px;
    }

    .produto-info h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
      color: #333;
    }

    .descricao {
      color: #666;
      font-size: 14px;
      margin: 0 0 10px 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .preco {
      font-size: 20px;
      font-weight: bold;
      color: #28a745;
      margin: 10px 0;
    }

    .categoria {
      display: inline-block;
      padding: 4px 8px;
      background: #f8f9fa;
      color: #666;
      border-radius: 4px;
      font-size: 12px;
    }

    .produto-actions {
      display: flex;
      gap: 5px;
      padding: 15px;
      border-top: 1px solid #eee;
    }

    .produto-actions button {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      transition: opacity 0.2s;
    }

    .produto-actions button:hover {
      opacity: 0.8;
    }

    .btn-edit {
      background: #007bff;
      color: white;
    }

    .btn-toggle {
      background: #ffc107;
      color: #333;
    }

    .btn-delete {
      background: #dc3545;
      color: white;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #999;
      font-size: 18px;
    }

    @media (max-width: 768px) {
      .produtos-grid {
        grid-template-columns: 1fr;
      }

      .filters {
        flex-direction: column;
      }

      .category-filter {
        width: 100%;
      }
    }
  `]
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  searchTerm: string = '';
  categoriaFiltro: string = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe(
      produtos => {
        this.produtos = produtos;
        this.filtrarProdutos();
      },
      error => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  filtrarProdutos() {
    this.produtosFiltrados = this.produtos.filter(produto => {
      const matchSearch = !this.searchTerm || 
        produto.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchCategoria = !this.categoriaFiltro || 
        produto.categoria === this.categoriaFiltro;
      
      return matchSearch && matchCategoria;
    });
  }

  novoProduto() {
    this.router.navigate(['/admin/produtos/novo']);
  }

  editarProduto(id: string | undefined) {
    if (id) {
      this.router.navigate(['/admin/produtos/editar', id]);
    }
  }

  async toggleDisponibilidade(produto: Produto) {
    if (produto.id) {
      try {
        await this.produtoService.toggleDisponibilidade(produto.id, !produto.disponivel);
      } catch (error) {
        console.error('Erro ao alterar disponibilidade:', error);
      }
    }
  }

  async deletarProduto(id: string | undefined) {
    if (id && confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await this.produtoService.deletarProduto(id);
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    }
  }

  getCategoriaLabel(categoria: string): string {
    const labels: { [key: string]: string } = {
      'entrada': 'Entrada',
      'principal': 'Prato Principal',
      'bebida': 'Bebida',
      'sobremesa': 'Sobremesa'
    };
    return labels[categoria] || categoria;
  }
}
