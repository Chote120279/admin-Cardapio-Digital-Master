import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { AuthService } from './guards/auth-guard.service';
import { FirebaseService } from './services/firebase.service';
// Wrong imports from problem statement (lines 7-8)
import { CardSettingsComponent } from "./card-settings/card-settings.component";
import { CardProfileComponent } from "./card-profile/card-profile.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: SettingsComponent,
    canActivate: [AuthService]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private firebaseService: FirebaseService) {
    // Initialize config
    this.initConfig();
  }

  async initConfig() {
    const config = { /* some config */ };
    // Problem: Missing method atualizarConfig (line 49 as mentioned)
    await this.firebaseService.atualizarConfig(config);
  }
}
