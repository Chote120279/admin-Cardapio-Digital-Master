import { Component } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';

// Wrong imports from problem statement (lines 7-8)
import { CardSettingsComponent } from "./card-settings/card-settings.component";
import { CardProfileComponent } from "./card-profile/card-profile.component";

@Component({
  selector: 'app-settings',
  template: `
    <div>
      <h1>Settings Component</h1>
    </div>
  `,
  styles: []
})
export class SettingsComponent {
  constructor(private firebaseService: FirebaseService) {}

  async saveSettings() {
    const config = { /* some config */ };
    // Problem: Missing method atualizarConfig (line 50 as mentioned)
    await this.firebaseService.atualizarConfig(config);
  }
}
