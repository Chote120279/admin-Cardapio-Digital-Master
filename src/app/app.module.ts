import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { CardSettingsComponent } from './components/card-settings/card-settings.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth-guard.service';
import { ProdutoService } from './services/produto.service';
import { CategoriaService } from './services/categoria.service';

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    CardSettingsComponent,
    CardProfileComponent
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
