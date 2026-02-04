import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Adicional {
  nome: string;
  preco: number;
}

interface Tamanho {
  nome: string;
  multiplicador: number;
}

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  ativo: boolean;
  adicionais: Adicional[];
  tamanhos: Tamanho[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="background: #f3f4f6; min-height: 100vh; padding: 2rem;">
      <div style="max-width: 1400px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="background: white; border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; 
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h1 style="font-size: 2.5rem; font-weight: bold; color: #111827; margin-bottom: 0.5rem;">
                📁 Categorias
              </h1>
              <p style="color: #6b7280; font-size: 1.125rem;">
                Gerencie as categorias do cardápio
              </p>
            </div>
            <button (click)="openModal()"
                    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           color: white; padding: 1rem 2rem; border: none; border-radius: 0.75rem; 
                           cursor: pointer; font-weight: 700; font-size: 1rem;
                           box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                           transition: transform 0.2s;">
              ➕ Nova Categoria
            </button>
          </div>
        </div>

        <!-- Categories Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
                    gap: 1.5rem;">
          
          <div *ngFor="let categoria of categorias" 
               style="background: white; border-radius: 1rem; padding: 1.5rem; 
                      box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: relative;
                      transition: transform 0.2s, box-shadow 0.2s;">
            
            <!-- Status Badge -->
            <div [style.background]="categoria.ativo ? '#10b981' : '#ef4444'"
                 style="position: absolute; top: 1rem; right: 1rem; 
                        padding: 0.25rem 0.75rem; border-radius: 1rem; 
                        color: white; font-size: 0.75rem; font-weight: 700;">
              {{ categoria.ativo ? 'Ativa' : 'Inativa' }}
            </div>

            <!-- Icon -->
            <div style="font-size: 3rem; margin-bottom: 1rem;">
              {{ categoria.icone }}
            </div>

            <!-- Info -->
            <h3 style="font-size: 1.5rem; font-weight: bold; color: #111827; margin-bottom: 0.5rem;">
              {{ categoria.nome }}
            </h3>
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">
              {{ categoria.descricao }}
            </p>

            <!-- Stats -->
            <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
              <div *ngIf="categoria.adicionais.length > 0"
                   style="background: #dcfce7; color: #166534; padding: 0.375rem 0.75rem; 
                          border-radius: 0.5rem; font-size: 0.75rem; font-weight: 600;">
                ➕ {{ categoria.adicionais.length }} adicionais
              </div>
              <div *ngIf="categoria.tamanhos.length > 0"
                   style="background: #dbeafe; color: #1e40af; padding: 0.375rem 0.75rem; 
                          border-radius: 0.5rem; font-size: 0.75rem; font-weight: 600;">
                📏 {{ categoria.tamanhos.length }} tamanhos
              </div>
            </div>

            <!-- Actions -->
            <div style="display: flex; gap: 0.5rem;">
              <button (click)="editCategoria(categoria)"
                      style="flex: 1; background: #3b82f6; color: white; 
                             padding: 0.75rem; border: none; border-radius: 0.5rem; 
                             cursor: pointer; font-weight: 600;
                             transition: background 0.2s;">
                ✏️ Editar
              </button>
              <button (click)="deleteCategoria(categoria.id)"
                      style="background: #ef4444; color: white; 
                             padding: 0.75rem 1rem; border: none; border-radius: 0.5rem; 
                             cursor: pointer; font-weight: 600;
                             transition: background 0.2s;">
                🗑️
              </button>
            </div>
          </div>

        </div>

        <!-- Empty State -->
        <div *ngIf="categorias.length === 0" 
             style="background: white; border-radius: 1rem; padding: 4rem; text-align: center;">
          <div style="font-size: 6rem; opacity: 0.3;">📁</div>
          <h3 style="font-size: 2rem; font-weight: bold; color: #111827;">Nenhuma categoria</h3>
          <p style="color: #6b7280;">Adicione sua primeira categoria ao cardápio</p>
        </div>

      </div>
    </div>

    <!-- Modal -->
    <div *ngIf="showModal" 
         style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                background: rgba(0,0,0,0.5); display: flex; align-items: center; 
                justify-content: center; z-index: 1000;"
         (click)="closeModal()">
      
      <div class="modal-content-scrollable"
           style="background: white; border-radius: 1.5rem; padding: 2rem; 
                  max-width: 500px; width: 90%; max-height: 90vh;
                  box-shadow: 0 20px 60px rgba(0,0,0,0.3);"
           (click)="$event.stopPropagation()">
        
        <h2 style="font-size: 2rem; font-weight: bold; color: #111827; margin-bottom: 1.5rem;">
          {{ editingCategoria ? '✏️ Editar Categoria' : '➕ Nova Categoria' }}
        </h2>

        <form (ngSubmit)="saveCategoria()">
          
          <!-- Nome -->
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; color: #374151; 
                          margin-bottom: 0.5rem; font-size: 0.875rem;">
              Nome da Categoria *
            </label>
            <input type="text" 
                   [(ngModel)]="formData.nome" 
                   name="nome"
                   required
                   placeholder="Ex: Pizzas, Bebidas, Sobremesas..."
                   style="width: 100%; padding: 0.875rem; border: 2px solid #e5e7eb; 
                          border-radius: 0.75rem; font-size: 1rem;
                          transition: border-color 0.2s;">
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
                      placeholder="Descreva a categoria..."
                      style="width: 100%; padding: 0.875rem; border: 2px solid #e5e7eb; 
                             border-radius: 0.75rem; font-size: 1rem; resize: vertical;
                             transition: border-color 0.2s;"></textarea>
          </div>

          <!-- Ícone -->
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-weight: 600; color: #374151; 
                          margin-bottom: 0.5rem; font-size: 0.875rem;">
              Ícone (Emoji)
            </label>
            <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 0.5rem;">
              <button type="button" 
                      *ngFor="let emoji of emojis"
                      (click)="formData.icone = emoji"
                      [style.background]="formData.icone === emoji ? '#667eea' : '#f3f4f6'"
                      [style.color]="formData.icone === emoji ? 'white' : '#111827'"
                      style="padding: 0.75rem; border: none; border-radius: 0.5rem; 
                             cursor: pointer; font-size: 1.5rem; transition: all 0.2s;">
                {{ emoji }}
              </button>
            </div>
          </div>

          <!-- Status -->
          <div style="margin-bottom: 2rem;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" 
                     [(ngModel)]="formData.ativo" 
                     name="ativo"
                     style="width: 1.25rem; height: 1.25rem; margin-right: 0.75rem; cursor: pointer;">
              <span style="font-weight: 600; color: #374151;">Categoria ativa</span>
            </label>
          </div>

          <!-- Adicionais Section -->
          <div style="margin-bottom: 2rem; padding: 1.5rem; background: #f9fafb; border-radius: 0.75rem;">
            <h3 style="font-weight: 700; color: #111827; margin-bottom: 1rem; font-size: 1.125rem;">
              ➕ Adicionais
            </h3>
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">
              Adicione opcionais que podem ser incluídos nos produtos desta categoria
            </p>
            
            <!-- Add New Adicional -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
              <input type="text" 
                     [(ngModel)]="novoAdicional.nome"
                     name="adicionalNome"
                     placeholder="Nome (ex: Queijo extra)"
                     style="flex: 2; padding: 0.75rem; border: 2px solid #e5e7eb; 
                            border-radius: 0.5rem; font-size: 0.875rem;">
              <input type="number" 
                     [(ngModel)]="novoAdicional.preco"
                     name="adicionalPreco"
                     placeholder="Preço"
                     step="0.01"
                     min="0"
                     style="flex: 1; padding: 0.75rem; border: 2px solid #e5e7eb; 
                            border-radius: 0.5rem; font-size: 0.875rem;">
              <button type="button" 
                      (click)="adicionarAdicional()"
                      style="background: #10b981; color: white; padding: 0.75rem 1rem; 
                             border: none; border-radius: 0.5rem; cursor: pointer; 
                             font-weight: 600; font-size: 0.875rem; white-space: nowrap;">
                ➕ Adicionar
              </button>
            </div>

            <!-- List of Adicionais -->
            <div *ngIf="formData.adicionais.length > 0" 
                 style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div *ngFor="let adicional of formData.adicionais; let i = index"
                   style="display: flex; justify-content: space-between; align-items: center;
                          background: white; padding: 0.75rem; border-radius: 0.5rem;
                          border: 1px solid #e5e7eb;">
                <span style="font-weight: 600; color: #111827;">{{ adicional.nome }}</span>
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <span style="color: #10b981; font-weight: 700;">R$ {{ adicional.preco.toFixed(2) }}</span>
                  <button type="button" 
                          (click)="removerAdicional(i)"
                          style="background: #ef4444; color: white; padding: 0.375rem 0.75rem; 
                                 border: none; border-radius: 0.375rem; cursor: pointer; 
                                 font-size: 0.75rem; font-weight: 600;">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
            <div *ngIf="formData.adicionais.length === 0"
                 style="text-align: center; color: #9ca3af; font-size: 0.875rem; padding: 1rem;">
              Nenhum adicional configurado
            </div>
          </div>

          <!-- Tamanhos Section -->
          <div style="margin-bottom: 2rem; padding: 1.5rem; background: #f9fafb; border-radius: 0.75rem;">
            <h3 style="font-weight: 700; color: #111827; margin-bottom: 1rem; font-size: 1.125rem;">
              📏 Tamanhos
            </h3>
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">
              Configure tamanhos com multiplicadores de preço (ex: 1.0 = preço base, 1.5 = 50% a mais)
            </p>
            
            <!-- Add New Tamanho -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
              <input type="text" 
                     [(ngModel)]="novoTamanho.nome"
                     name="tamanhoNome"
                     placeholder="Nome (ex: Grande)"
                     style="flex: 2; padding: 0.75rem; border: 2px solid #e5e7eb; 
                            border-radius: 0.5rem; font-size: 0.875rem;">
              <input type="number" 
                     [(ngModel)]="novoTamanho.multiplicador"
                     name="tamanhoMultiplicador"
                     placeholder="Multiplicador"
                     step="0.1"
                     min="0.1"
                     style="flex: 1; padding: 0.75rem; border: 2px solid #e5e7eb; 
                            border-radius: 0.5rem; font-size: 0.875rem;">
              <button type="button" 
                      (click)="adicionarTamanho()"
                      style="background: #3b82f6; color: white; padding: 0.75rem 1rem; 
                             border: none; border-radius: 0.5rem; cursor: pointer; 
                             font-weight: 600; font-size: 0.875rem; white-space: nowrap;">
                ➕ Adicionar
              </button>
            </div>

            <!-- List of Tamanhos -->
            <div *ngIf="formData.tamanhos.length > 0" 
                 style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div *ngFor="let tamanho of formData.tamanhos; let i = index"
                   style="display: flex; justify-content: space-between; align-items: center;
                          background: white; padding: 0.75rem; border-radius: 0.5rem;
                          border: 1px solid #e5e7eb;">
                <span style="font-weight: 600; color: #111827;">{{ tamanho.nome }}</span>
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <span style="color: #3b82f6; font-weight: 700;">{{ tamanho.multiplicador.toFixed(1) }}x</span>
                  <button type="button" 
                          (click)="removerTamanho(i)"
                          style="background: #ef4444; color: white; padding: 0.375rem 0.75rem; 
                                 border: none; border-radius: 0.375rem; cursor: pointer; 
                                 font-size: 0.75rem; font-weight: 600;">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
            <div *ngIf="formData.tamanhos.length === 0"
                 style="text-align: center; color: #9ca3af; font-size: 0.875rem; padding: 1rem;">
              Nenhum tamanho configurado
            </div>
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
              {{ editingCategoria ? 'Salvar' : 'Adicionar' }}
            </button>
          </div>

        </form>

      </div>
    </div>
  `,
  styles: [`
    input:focus, textarea:focus {
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
export class CategoriesComponent implements OnInit {
  categorias: Categoria[] = [];
  showModal = false;
  editingCategoria: Categoria | null = null;
  
  formData = {
    nome: '',
    descricao: '',
    icone: '🍕',
    ativo: true,
    adicionais: [] as Adicional[],
    tamanhos: [] as Tamanho[]
  };

  // Form helpers for adding new items
  novoAdicional = { nome: '', preco: 0 };
  novoTamanho = { nome: '', multiplicador: 1 };

  emojis = ['🍕', '🍔', '🌮', '🍜', '🍱', '🥗', '🍰', '🧁', '☕', '🥤', '🍺', '🍷', '🥘', '🍝', '🥩', '🐟'];

  ngOnInit() {
    // Sample data
    this.categorias = [
      {
        id: '1',
        nome: 'Pizzas',
        descricao: 'Pizzas tradicionais e especiais',
        icone: '🍕',
        ativo: true,
        adicionais: [
          { nome: 'Queijo extra', preco: 5.00 },
          { nome: 'Bacon', preco: 7.00 },
          { nome: 'Azeitonas', preco: 3.00 }
        ],
        tamanhos: [
          { nome: 'Pequena', multiplicador: 0.8 },
          { nome: 'Média', multiplicador: 1.0 },
          { nome: 'Grande', multiplicador: 1.3 }
        ]
      },
      {
        id: '2',
        nome: 'Bebidas',
        descricao: 'Refrigerantes, sucos e outras bebidas',
        icone: '🥤',
        ativo: true,
        adicionais: [],
        tamanhos: [
          { nome: '350ml', multiplicador: 1.0 },
          { nome: '600ml', multiplicador: 1.5 },
          { nome: '2L', multiplicador: 2.5 }
        ]
      },
      {
        id: '3',
        nome: 'Sobremesas',
        descricao: 'Doces e sobremesas deliciosas',
        icone: '🍰',
        ativo: true,
        adicionais: [
          { nome: 'Chantilly', preco: 3.00 },
          { nome: 'Calda extra', preco: 2.00 }
        ],
        tamanhos: []
      }
    ];
  }

  openModal() {
    this.showModal = true;
    this.editingCategoria = null;
    this.formData = {
      nome: '',
      descricao: '',
      icone: '🍕',
      ativo: true,
      adicionais: [],
      tamanhos: []
    };
    this.novoAdicional = { nome: '', preco: 0 };
    this.novoTamanho = { nome: '', multiplicador: 1 };
  }

  closeModal() {
    this.showModal = false;
    this.editingCategoria = null;
  }

  editCategoria(categoria: Categoria) {
    this.editingCategoria = categoria;
    this.formData = { ...categoria };
    this.showModal = true;
  }

  saveCategoria() {
    if (!this.formData.nome.trim()) {
      alert('Por favor, preencha o nome da categoria');
      return;
    }

    if (this.editingCategoria) {
      // Update existing
      const index = this.categorias.findIndex(c => c.id === this.editingCategoria!.id);
      if (index !== -1) {
        this.categorias[index] = { ...this.editingCategoria, ...this.formData };
      }
    } else {
      // Add new
      const newCategoria: Categoria = {
        id: Date.now().toString(),
        ...this.formData
      };
      this.categorias.push(newCategoria);
    }

    this.closeModal();
  }

  deleteCategoria(id: string) {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categorias = this.categorias.filter(c => c.id !== id);
    }
  }

  // Methods for managing Adicionais
  adicionarAdicional() {
    if (this.novoAdicional.nome.trim() && this.novoAdicional.preco >= 0) {
      this.formData.adicionais.push({ ...this.novoAdicional });
      this.novoAdicional = { nome: '', preco: 0 };
    }
  }

  removerAdicional(index: number) {
    this.formData.adicionais.splice(index, 1);
  }

  // Methods for managing Tamanhos
  adicionarTamanho() {
    if (this.novoTamanho.nome.trim() && this.novoTamanho.multiplicador > 0) {
      this.formData.tamanhos.push({ ...this.novoTamanho });
      this.novoTamanho = { nome: '', multiplicador: 1 };
    }
  }

  removerTamanho(index: number) {
    this.formData.tamanhos.splice(index, 1);
  }
}
