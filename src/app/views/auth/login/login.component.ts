import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h1>Login - Admin Cardápio Digital</h1>
      <form (ngSubmit)="onLogin()">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
        <input type="password" [(ngModel)]="password" name="password" placeholder="Senha" required>
        <button type="submit">Entrar</button>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/admin']);
    } catch (error: any) {
      // Provide specific error messages based on Firebase error codes
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'Email não encontrado. Verifique o email digitado.';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Senha incorreta. Tente novamente.';
      } else if (error.code === 'auth/too-many-requests') {
        this.errorMessage = 'Muitas tentativas de login. Tente novamente mais tarde.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'Email inválido. Verifique o formato do email.';
      } else if (error.code === 'auth/user-disabled') {
        this.errorMessage = 'Esta conta foi desabilitada. Contate o administrador.';
      } else {
        this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';
      }
      console.error('Erro no login:', error);
    }
  }
}
