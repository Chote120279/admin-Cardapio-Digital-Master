import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData, docData } from '@angular/fire/firestore';

/**
 * Produto interface
 */
export interface Produto {
  id?: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: 'entrada' | 'principal' | 'bebida' | 'sobremesa';
  imagemUrl: string;
  disponivel: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ProdutoService - Service for managing products
 */
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private collectionName = 'produtos';

  constructor(private firestore: Firestore) {}

  /**
   * List all products
   * @returns Observable of products array
   */
  listarProdutos(): Observable<Produto[]> {
    const produtosRef = collection(this.firestore, this.collectionName);
    const q = query(produtosRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Produto[]>;
  }

  /**
   * Get a single product by ID
   * @param id Product ID
   * @returns Observable of product
   */
  obterProduto(id: string): Observable<Produto> {
    const produtoRef = doc(this.firestore, this.collectionName, id);
    return docData(produtoRef, { idField: 'id' }) as Observable<Produto>;
  }

  /**
   * Create a new product
   * @param produto Product data
   */
  async criarProduto(produto: Produto): Promise<void> {
    try {
      const produtosRef = collection(this.firestore, this.collectionName);
      const newProdutoRef = doc(produtosRef);
      const produtoData = {
        ...produto,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await setDoc(newProdutoRef, produtoData);
      console.log('Produto criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }

  /**
   * Update an existing product
   * @param id Product ID
   * @param produto Updated product data
   */
  async atualizarProduto(id: string, produto: Partial<Produto>): Promise<void> {
    try {
      const produtoRef = doc(this.firestore, this.collectionName, id);
      const produtoData = {
        ...produto,
        updatedAt: new Date()
      };
      await updateDoc(produtoRef, produtoData);
      console.log('Produto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }

  /**
   * Delete a product
   * @param id Product ID
   */
  async deletarProduto(id: string): Promise<void> {
    try {
      const produtoRef = doc(this.firestore, this.collectionName, id);
      await deleteDoc(produtoRef);
      console.log('Produto deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  }

  /**
   * Toggle product availability
   * @param id Product ID
   * @param disponivel Availability status
   */
  async toggleDisponibilidade(id: string, disponivel: boolean): Promise<void> {
    try {
      await this.atualizarProduto(id, { disponivel });
      console.log('Disponibilidade atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade:', error);
      throw error;
    }
  }

  /**
   * Get products by category
   * @param categoria Category name
   * @returns Observable of products array
   */
  listarProdutosPorCategoria(categoria: string): Observable<Produto[]> {
    const produtosRef = collection(this.firestore, this.collectionName);
    const q = query(produtosRef, where('categoria', '==', categoria), orderBy('nome'));
    return collectionData(q, { idField: 'id' }) as Observable<Produto[]>;
  }
}
