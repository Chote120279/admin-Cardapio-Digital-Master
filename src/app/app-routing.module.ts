import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { ProdutosComponent } from './views/admin/produtos/produtos.component';
import { ProdutoFormComponent } from './views/admin/produto-form/produto-form.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SettingsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'produtos', component: ProdutosComponent },
      { path: 'produtos/novo', component: ProdutoFormComponent },
      { path: 'produtos/editar/:id', component: ProdutoFormComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
