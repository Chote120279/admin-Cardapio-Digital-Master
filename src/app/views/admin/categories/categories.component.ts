import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  ativo: boolean;
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
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem;">
              {{ categoria.descricao }}
            </p>

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
      
      <div style="background: white; border-radius: 1.5rem; padding: 2rem; 
                  max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;
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
    ativo: true
  };

  emojis = ['🍕', '🍔', '🌮', '🍜', '🍱', '🥗', '🍰', '🧁', '☕', '🥤', '🍺', '🍷', '🥘', '🍝', '🥩', '🐟'];

  ngOnInit() {
    // Sample data
    this.categorias = [
      {
        id: '1',
        nome: 'Pizzas',
        descricao: 'Pizzas tradicionais e especiais',
        icone: '🍕',
        ativo: true
      },
      {
        id: '2',
        nome: 'Bebidas',
        descricao: 'Refrigerantes, sucos e outras bebidas',
        icone: '🥤',
        ativo: true
      },
      {
        id: '3',
        nome: 'Sobremesas',
        descricao: 'Doces e sobremesas deliciosas',
        icone: '🍰',
        ativo: true
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
      ativo: true
    };
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
}
