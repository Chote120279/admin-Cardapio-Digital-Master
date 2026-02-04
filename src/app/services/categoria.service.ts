import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  ativo: boolean;
  adicionais: Array<{ nome: string; preco: number }>;
  tamanhos: Array<{ nome: string; multiplicador: number }>;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categorias$ = new BehaviorSubject<Categoria[]>([]);
  
  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem('categorias');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.categorias$.next(parsed);
        console.log('✅ Categorias carregadas do localStorage:', parsed);
      } catch (e) {
        console.error('❌ Erro ao carregar categorias:', e);
      }
    } else {
      console.log('ℹ️ Nenhuma categoria no localStorage');
    }
  }

  getCategorias(): Observable<Categoria[]> {
    return this.categorias$.asObservable();
  }

  getCategoriasValue(): Categoria[] {
    return this.categorias$.value;
  }

  addCategoria(categoria: Categoria) {
    const categorias = [...this.categorias$.value, categoria];
    this.saveAndNotify(categorias);
    console.log('➕ Categoria adicionada:', categoria);
  }

  updateCategoria(id: string, updated: Categoria) {
    const categorias = this.categorias$.value.map(c => 
      c.id === id ? updated : c
    );
    this.saveAndNotify(categorias);
    console.log('✏️ Categoria atualizada:', updated);
  }

  deleteCategoria(id: string) {
    const categorias = this.categorias$.value.filter(c => c.id !== id);
    this.saveAndNotify(categorias);
    console.log('🗑️ Categoria deletada:', id);
  }

  private saveAndNotify(categorias: Categoria[]) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
    this.categorias$.next(categorias);
  }
}
