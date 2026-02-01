import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';

/**
 * FirebaseService - Service for handling Firebase Firestore and Storage operations
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) {}

  /**
   * Get data from Firestore
   */
  getData() {
    return {};
  }

  /**
   * Update application configuration in Firestore
   * @param config Configuration object to update
   */
  async atualizarConfig(config: any): Promise<void> {
    try {
      const configRef = doc(this.firestore, 'config', 'app');
      await updateDoc(configRef, config);
      console.log('Configuração atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      throw error;
    }
  }

  /**
   * Get application configuration from Firestore
   * @returns Configuration object
   */
  async obterConfig(): Promise<any> {
    try {
      const configRef = doc(this.firestore, 'config', 'app');
      const docSnap = await getDoc(configRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Erro ao obter configuração:', error);
      throw error;
    }
  }

  /**
   * Upload image to Firebase Storage
   * @param file File to upload
   * @param path Storage path
   * @returns Download URL of uploaded image
   */
  async uploadImagem(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(this.storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  }

  /**
   * Delete image from Firebase Storage
   * @param url URL of image to delete
   */
  async deletarImagem(url: string): Promise<void> {
    try {
      const storageRef = ref(this.storage, url);
      await deleteObject(storageRef);
      console.log('Imagem deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      throw error;
    }
  }
}
