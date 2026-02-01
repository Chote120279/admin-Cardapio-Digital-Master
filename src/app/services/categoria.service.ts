import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData, docData } from '@angular/fire/firestore';

/**
 * Categoria interface
 */
export interface Categoria {
  id?: string;
  nome: string;
  descricao: string;
  icone: string;
  ordem: number;
}

/**
 * CategoriaService - Service for managing categories
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private collectionName = 'categorias';

  constructor(private firestore: Firestore) {}

  /**
   * List all categories
   * @returns Observable of categories array
   */
  listarCategorias(): Observable<Categoria[]> {
    const categoriasRef = collection(this.firestore, this.collectionName);
    const q = query(categoriasRef, orderBy('ordem'));
    return collectionData(q, { idField: 'id' }) as Observable<Categoria[]>;
  }

  /**
   * Get a single category by ID
   * @param id Category ID
   * @returns Observable of category
   */
  obterCategoria(id: string): Observable<Categoria> {
    const categoriaRef = doc(this.firestore, this.collectionName, id);
    return docData(categoriaRef, { idField: 'id' }) as Observable<Categoria>;
  }

  /**
   * Create a new category
   * @param categoria Category data
   */
  async criarCategoria(categoria: Categoria): Promise<void> {
    try {
      const categoriasRef = collection(this.firestore, this.collectionName);
      const newCategoriaRef = doc(categoriasRef);
      await setDoc(newCategoriaRef, categoria);
      console.log('Categoria criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  }

  /**
   * Update an existing category
   * @param id Category ID
   * @param categoria Updated category data
   */
  async atualizarCategoria(id: string, categoria: Partial<Categoria>): Promise<void> {
    try {
      const categoriaRef = doc(this.firestore, this.collectionName, id);
      await updateDoc(categoriaRef, categoria);
      console.log('Categoria atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      throw error;
    }
  }

  /**
   * Delete a category
   * @param id Category ID
   */
  async deletarCategoria(id: string): Promise<void> {
    try {
      const categoriaRef = doc(this.firestore, this.collectionName, id);
      await deleteDoc(categoriaRef);
      console.log('Categoria deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      throw error;
    }
  }
}
