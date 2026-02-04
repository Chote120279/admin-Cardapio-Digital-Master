import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { Subscription } from 'rxjs';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  disponivel: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="background: #f3f4f6; min-height: 100vh; padding: 2rem;">
      <div style="max-width: 1400px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="background: white; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; 
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h1 style="font-size: 2.5rem; font-weight: bold; color: #111827; margin-bottom: 0.5rem;">
                🍕 Produtos
              </h1>
              <p style="color: #6b7280; font-size: 1.125rem;">
                Gerencie os produtos do cardápio
              </p>
            </div>
            <button (click)="openModal()"
                    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           color: white; padding: 1rem 2rem; border: none; border-radius: 0.75rem; 
                           cursor: pointer; font-weight: 700; font-size: 1rem;
                           box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                           transition: transform 0.2s;">
              ➕ Novo Produto
            </button>
          </div>
        </div>

        <!-- Filter -->
        <div style="background: white; border-radius: 1rem; padding: 1rem; margin-bottom: 2rem; 
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button (click)="filtroCategoria = 'todos'"
                    [style.background]="filtroCategoria === 'todos' ? '#667eea' : '#f3f4f6'"
                    [style.color]="filtroCategoria === 'todos' ? 'white' : '#374151'"
                    style="padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; 
                           cursor: pointer; font-weight: 600; transition: all 0.2s;">
              Todos
            </button>
            <button *ngFor="let cat of categorias" 
                    (click)="filtroCategoria = cat"
                    [style.background]="filtroCategoria === cat ? '#667eea' : '#f3f4f6'"
                    [style.color]="filtroCategoria === cat ? 'white' : '#374151'"
                    style="padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; 
                           cursor: pointer; font-weight: 600; transition: all 0.2s;">
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Products Grid - Smaller Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
                    gap: 1rem;">
          
          <div *ngFor="let produto of getProdutosFiltrados()" 
               style="background: white; border-radius: 0.75rem; overflow: hidden;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                      transition: transform 0.2s, box-shadow 0.2s;">
            
            <!-- Image -->
            <div style="height: 140px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        display: flex; align-items: center; justify-content: center;
                        font-size: 3rem; position: relative;">
              {{ produto.imagem }}
              
              <!-- Status Badge -->
              <div [style.background]="produto.disponivel ? '#10b981' : '#ef4444'"
                   style="position: absolute; top: 0.5rem; right: 0.5rem; 
                          padding: 0.25rem 0.5rem; border-radius: 0.5rem; 
                          color: white; font-size: 0.625rem; font-weight: 700;">
                {{ produto.disponivel ? 'Disponível' : 'Indisponível' }}
              </div>
            </div>

            <!-- Content -->
            <div style="padding: 1rem;">
              
              <!-- Category Tag -->
              <div style="display: inline-block; background: #f3f4f6; color: #6b7280; 
                          padding: 0.25rem 0.5rem; border-radius: 0.375rem; 
                          font-size: 0.625rem; font-weight: 600; margin-bottom: 0.5rem;">
                {{ produto.categoria }}
              </div>

              <!-- Title -->
              <h3 style="font-size: 1rem; font-weight: bold; color: #111827; 
                         margin-bottom: 0.375rem; line-height: 1.25;">
                {{ produto.nome }}
              </h3>

              <!-- Description -->
              <p style="color: #6b7280; font-size: 0.75rem; margin-bottom: 0.75rem; 
                        line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; 
                        -webkit-box-orient: vertical; overflow: hidden;">
                {{ produto.descricao }}
              </p>

              <!-- Price -->
              <div style="font-size: 1.25rem; font-weight: bold; color: #10b981; margin-bottom: 0.75rem;">
                R$ {{ produto.preco.toFixed(2) }}
              </div>

              <!-- Actions -->
              <div style="display: flex; gap: 0.5rem;">
                <button (click)="editProduto(produto)"
                        style="flex: 1; background: #3b82f6; color: white; 
                               padding: 0.5rem; border: none; border-radius: 0.5rem; 
                               cursor: pointer; font-weight: 600; font-size: 0.75rem;
                               transition: background 0.2s;">
                  ✏️ Editar
                </button>
                <button (click)="deleteProduto(produto.id)"
                        style="background: #ef4444; color: white; 
                               padding: 0.5rem 0.75rem; border: none; border-radius: 0.5rem; 
                               cursor: pointer; font-weight: 600; font-size: 0.75rem;
                               transition: background 0.2s;">
                  🗑️
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Empty State -->
        <div *ngIf="getProdutosFiltrados().length === 0" 
             style="background: white; border-radius: 1rem; padding: 4rem; text-align: center;">
          <div style="font-size: 6rem; opacity: 0.3;">🍕</div>
          <h3 style="font-size: 2rem; font-weight: bold; color: #111827;">Nenhum produto</h3>
          <p style="color: #6b7280;">Adicione seu primeiro produto ao cardápio</p>
        </div>

      </div>
    </div>

    <!-- Modal -->
    <div *ngIf="showModal" 
         style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                background: rgba(0,0,0,0.5); display: flex; align-items: center; 
                justify-content: center; z-index: 1000; padding: 1rem;"
         (click)="closeModal()">
      
      <div style="background: white; border-radius: 1.5rem; padding: 2rem; 
                  max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto;
                  box-shadow: 0 20px 60px rgba(0,0,0,0.3);"
           (click)="$event.stopPropagation()">
        
        <h2 style="font-size: 2rem; font-weight: bold; color: #111827; margin-bottom: 1.5rem;">
          {{ editingProduto ? '✏️ Editar Produto' : '➕ Novo Produto' }}
        </h2>

        <form (ngSubmit)="saveProduto()">
          
          <!-- Nome -->
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; color: #374151; 
                          margin-bottom: 0.5rem; font-size: 0.875rem;">
              Nome do Produto *
            </label>
            <input type="text" 
                   [(ngModel)]="formData.nome" 
                   name="nome"
                   required
                   placeholder="Ex: Pizza Margherita, Hambúrguer..."
                   style="width: 100%; padding: 0.875rem; border: 2px solid #e5e7eb; 
                          border-radius: 0.75rem; font-size: 1rem;
                          transition: border-color 0.2s;">
          </div>

          <!-- Categoria -->
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; color: #374151; 
                          margin-bottom: 0.5rem; font-size: 0.875rem;">
              Categoria *
            </label>
            <select [(ngModel)]="formData.categoria" 
                    name="categoria"
                    required
                    style="width: 100%; padding: 0.875rem; border: 2px solid #e5e7eb; 
                           border-radius: 0.75rem; font-size: 1rem;
                           transition: border-color 0.2s; background: white;">
              <option value="">Selecione uma categoria</option>
              <option *ngFor="let cat of categorias" [value]="cat">{{ cat }}</option>
            </select>
          </div>

          <!-- Descrição -->
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; color: #374151; 
                          margin-bottom: 0.5rem; font-size: 0.875rem;">
              Descrição
            </label>
            <textarea [(ngModel)]="formData.descricao" 
                      name="descricao"
                      rows="3"
                      placeholder="Descreva o produto..."
                      style="width: 100%; padding: 0.875rem; border: 2px solid #e5e7eb; 
                             border-radius: 0.75rem; font-size: 1rem; resize: vertical;
                             transition: border-color 0.2s;"></textarea>
          </div>

          <!-- Preço -->
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; color: #374151; 
                          margin-bottom: 0.5rem; font-size: 0.875rem;">
              Preço (R$) *
            </label>
            <input type="number" 
                   [(ngModel)]="formData.preco" 
                   name="preco"
                   required
                   step="0.01"
                   min="0"
                   placeholder="0.00"
                   style="width: 100%; padding: 0.875rem; border: 2px solid #e5e7eb; 
                          border-radius: 0.75rem; font-size: 1rem;
                          transition: border-color 0.2s;">
          </div>

          <!-- Ícone/Emoji -->
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; color: #374151; 
                          margin-bottom: 0.5rem; font-size: 0.875rem;">
              Ícone do Produto (Emoji)
            </label>
            <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 0.5rem;">
              <button type="button" 
                      *ngFor="let emoji of emojis"
                      (click)="formData.imagem = emoji"
                      [style.background]="formData.imagem === emoji ? '#667eea' : '#f3f4f6'"
                      [style.color]="formData.imagem === emoji ? 'white' : '#111827'"
                      style="padding: 0.75rem; border: none; border-radius: 0.5rem; 
                             cursor: pointer; font-size: 1.5rem; transition: all 0.2s;">
                {{ emoji }}
              </button>
            </div>
          </div>

          <!-- Disponível -->
          <div style="margin-bottom: 2rem;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" 
                     [(ngModel)]="formData.disponivel" 
                     name="disponivel"
                     style="width: 1.25rem; height: 1.25rem; margin-right: 0.75rem; cursor: pointer;">
              <span style="font-weight: 600; color: #374151;">Produto disponível</span>
            </label>
          </div>

          <!-- Buttons -->
          <div style="display: flex; gap: 1rem;">
            <button type="button" 
                    (click)="closeModal()"
                    style="flex: 1; background: #e5e7eb; color: #374151; 
                           padding: 1rem; border: none; border-radius: 0.75rem; 
                           cursor: pointer; font-weight: 700; font-size: 1rem;
                           transition: background 0.2s;">
              Cancelar
            </button>
            <button type="submit"
                    style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           color: white; padding: 1rem; border: none; border-radius: 0.75rem; 
                           cursor: pointer; font-weight: 700; font-size: 1rem;
                           box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                           transition: transform 0.2s;">
              {{ editingProduto ? 'Salvar' : 'Adicionar' }}
            </button>
          </div>

        </form>

      </div>
    </div>
  `,
  styles: [`
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #667eea !important;
    }

    button:hover {
      transform: translateY(-2px);
    }

    button:active {
      transform: translateY(0);
    }
  `]
})
export class ProductsComponent implements OnInit, OnDestroy {
  produtos: Produto[] = [];
  categorias: string[] = [];
  filtroCategoria = 'todos';
  showModal = false;
  editingProduto: Produto | null = null;
  private subscription?: Subscription;
  
  formData = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    imagem: '🍕',
    disponivel: true
  };

  emojis = ['🍕', '🍔', '🌮', '🍜', '🍱', '🥗', '🍰', '🧁', '☕', '🥤', '🍺', '🍷', '🥘', '🍝', '🥩', '🐟', '🍤', '🌭', '🥙', '🍟', '🥓', '🧀', '🍪', '🎂'];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    // Carregar categorias do serviço
    this.subscription = this.categoriaService.getCategorias().subscribe(cats => {
      this.categorias = cats.map(c => c.nome);
      console.log('📁 Categorias carregadas:', this.categorias);
    });

    // Sample data
    this.produtos = [
      {
        id: '1',
        nome: 'Pizza Margherita',
        descricao: 'Molho de tomate, mussarela e manjericão fresco',
        preco: 35.00,
        categoria: 'Pizzas',
        imagem: '🍕',
        disponivel: true
      },
      {
        id: '2',
        nome: 'Hambúrguer Especial',
        descricao: 'Pão, carne 180g, queijo, alface, tomate e molho especial',
        preco: 28.00,
        categoria: 'Lanches',
        imagem: '🍔',
        disponivel: true
      },
      {
        id: '3',
        nome: 'Coca-Cola 350ml',
        descricao: 'Refrigerante gelado',
        preco: 5.00,
        categoria: 'Bebidas',
        imagem: '🥤',
        disponivel: true
      },
      {
        id: '4',
        nome: 'Tiramisu',
        descricao: 'Sobremesa italiana com café e mascarpone',
        preco: 15.00,
        categoria: 'Sobremesas',
        imagem: '🍰',
        disponivel: true
      },
      {
        id: '5',
        nome: 'Macarrão à Bolonhesa',
        descricao: 'Massa com molho de carne e parmesão',
        preco: 32.00,
        categoria: 'Pratos',
        imagem: '🍝',
        disponivel: true
      },
      {
        id: '6',
        nome: 'Pizza Calabresa',
        descricao: 'Molho, mussarela, calabresa e cebola',
        preco: 38.00,
        categoria: 'Pizzas',
        imagem: '🍕',
        disponivel: false
      }
    ];
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  openModal() {
    this.showModal = true;
    this.editingProduto = null;
    this.formData = {
      nome: '',
      descricao: '',
      preco: 0,
      categoria: '',
      imagem: '🍕',
      disponivel: true
    };
  }

  closeModal() {
    this.showModal = false;
    this.editingProduto = null;
  }

  editProduto(produto: Produto) {
    this.editingProduto = produto;
    this.formData = { ...produto };
    this.showModal = true;
  }

  saveProduto() {
    if (!this.formData.nome.trim() || !this.formData.categoria) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (this.formData.preco <= 0) {
      alert('O preço deve ser maior que zero');
      return;
    }

    if (this.editingProduto) {
      // Update existing
      const index = this.produtos.findIndex(p => p.id === this.editingProduto!.id);
      if (index !== -1) {
        this.produtos[index] = { ...this.editingProduto, ...this.formData };
      }
    } else {
      // Add new
      const newProduto: Produto = {
        id: Date.now().toString(),
        ...this.formData
      };
      this.produtos.push(newProduto);
    }

    this.closeModal();
  }

  deleteProduto(id: string) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtos = this.produtos.filter(p => p.id !== id);
    }
  }

  getProdutosFiltrados(): Produto[] {
    if (this.filtroCategoria === 'todos') {
      return this.produtos;
    }
    return this.produtos.filter(p => p.categoria === this.filtroCategoria);
  }
}
