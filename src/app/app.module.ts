import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { CardSettingsComponent } from './components/card-settings/card-settings.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './guards/auth-guard.service';
import { routes } from './app.routes';

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
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    FirebaseService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
