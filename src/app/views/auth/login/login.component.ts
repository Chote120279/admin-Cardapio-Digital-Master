import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';

// Fixed imports - correct paths to components
import { CardSettingsComponent } from "../../../components/card-settings/card-settings.component";
import { CardProfileComponent } from "../../../components/card-profile/card-profile.component";

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

// Fixed: Properly export LoginComponent
// export { LoginComponent as SettingsComponent }; // REMOVED - this was the bug
