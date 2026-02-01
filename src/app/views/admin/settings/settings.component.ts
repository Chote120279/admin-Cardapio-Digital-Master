import { Component } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-settings',
  template: `
    <div>
      <h1>Settings Component</h1>
    </div>
  `,
  styles: [],
  standalone: false
})
export class SettingsComponent {
  constructor(private firebaseService: FirebaseService) {}

  async saveSettings() {
    const config = { /* some config */ };
    // Problem: Missing method atualizarConfig (line 50 as mentioned)
    await this.firebaseService.atualizarConfig(config);
  }
}
