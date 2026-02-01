import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
