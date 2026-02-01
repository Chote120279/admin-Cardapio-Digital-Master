import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Views
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { ProdutosComponent } from './views/admin/produtos/produtos.component';
import { ProdutoFormComponent } from './views/admin/produto-form/produto-form.component';

// Components
import { CardSettingsComponent } from './components/card-settings/card-settings.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
import { AlertComponent } from './components/alert/alert.component';

// Services
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth-guard.service';
import { ProdutoService } from './services/produto.service';
import { CategoriaService } from './services/categoria.service';

// Pipes
import { MoedaPipe } from './pipes/moeda.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    // Views
    LoginComponent,
    SettingsComponent,
    ProdutosComponent,
    ProdutoFormComponent,
    // Components
    CardSettingsComponent,
    CardProfileComponent,
    LoadingComponent,
    ModalConfirmacaoComponent,
    AlertComponent,
    // Pipes
    MoedaPipe,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    FirebaseService,
    AuthService,
    AuthGuard,
    ProdutoService,
    CategoriaService,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
