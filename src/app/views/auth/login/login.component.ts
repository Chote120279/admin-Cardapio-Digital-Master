import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';

// Wrong imports from problem statement (lines 7-8)
import { CardSettingsComponent } from "./card-settings/card-settings.component";
import { CardProfileComponent } from "./card-profile/card-profile.component";

@Component({
  selector: 'app-login',
  template: '<div>Login Component</div>',
  styles: []
})
export class LoginComponent {
  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  async login() {
    const config = { /* some config */ };
    // Problem: Missing method atualizarConfig (line 50 as mentioned)
    await this.firebaseService.atualizarConfig(config);
    this.router.navigate(['/admin']);
  }
}

// Problem #1: Exporting wrong component (SettingsComponent instead of LoginComponent)
export { LoginComponent as SettingsComponent };
