import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../../services/config.service';
import { AppConfig, PRE_DEFINED_THEMES, Theme } from '../../../models/app-config.interface';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  activeTab: 'restaurante' | 'tema' | 'produtos' | 'aparencia' = 'restaurante';
  config: AppConfig;
  preDefinedThemes = PRE_DEFINED_THEMES;
  showSaveNotification = false;

  constructor(private configService: ConfigService) {
    this.config = this.configService.getConfigValue();
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.config = { ...config };
    });
  }

  setActiveTab(tab: 'restaurante' | 'tema' | 'produtos' | 'aparencia') {
    this.activeTab = tab;
  }

  selectTheme(theme: Theme) {
    this.config.tema = { ...theme };
    this.configService.applyTheme(theme);
  }

  updateCustomColor(property: keyof Theme, color: string) {
    (this.config.tema as any)[property] = color;
    this.config.tema.nome = 'Personalizado';
    this.configService.applyTheme(this.config.tema);
  }

  saveSettings() {
    this.configService.updateConfig(this.config);
    this.showSaveNotification = true;
    setTimeout(() => {
      this.showSaveNotification = false;
    }, 3000);
  }

  resetSettings() {
    if (confirm('Tem certeza que deseja resetar todas as configurações para o padrão?')) {
      this.configService.resetToDefault();
      this.config = this.configService.getConfigValue();
    }
  }

  cancelChanges() {
    this.config = this.configService.getConfigValue();
  }
}

