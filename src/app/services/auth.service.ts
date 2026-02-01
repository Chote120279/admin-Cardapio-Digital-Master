import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';

/**
 * AuthService - Service for handling Firebase Authentication
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  /**
   * Check if user is logged in
   * @returns User object if logged in, null otherwise
   */
  async logado(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        this.auth,
        (user: User | null) => {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        },
        reject
      );
    });
  }

  /**
   * Login user with email and password
   * @param email User email
   * @param password User password
   * @returns User object
   */
  async login(email: string, password: string): Promise<any> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  }

  /**
   * Get current user
   * @returns Current user object or null
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
