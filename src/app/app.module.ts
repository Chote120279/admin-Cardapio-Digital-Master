import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/auth/login/login.component';
import { SettingsComponent } from './views/admin/settings/settings.component';
import { OrdersComponent } from './views/admin/orders/orders.component';
import { CardSettingsComponent } from './components/card-settings/card-settings.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './guards/auth-guard.service';
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
    HttpClientModule,
    OrdersComponent
  ],
  providers: [
    FirebaseService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Fixed: Properly export AppModule (was exporting AppRoutingModule)
// export { AppRoutingModule }; // REMOVED - this was the bug
