import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { OrdersComponent } from './views/admin/orders/orders.component';
import { AuthService } from './guards/auth-guard.service';
import { FirebaseService } from './services/firebase.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin',
    canActivate: [AuthService],
    children: [
      { path: 'orders', component: OrdersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'orders', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/admin/orders', pathMatch: 'full' }
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
