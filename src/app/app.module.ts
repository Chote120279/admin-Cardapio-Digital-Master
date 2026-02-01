import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { CardSettingsComponent } from './components/card-settings/card-settings.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './guards/auth-guard.service';

// Problem: Wrong import - should be from '@angular/common/http' not the incorrect path
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [
    FirebaseService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Problem #3: Exporting wrong module (AppRoutingModule instead of AppModule)
export { AppRoutingModule };
