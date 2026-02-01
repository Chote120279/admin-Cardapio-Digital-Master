import { Component, Input, Output, EventEmitter } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  template: `
    <div class="alert" *ngIf="show" [class]="type">
      <div class="alert-icon">
        <span *ngIf="type === 'success'">✓</span>
        <span *ngIf="type === 'error'">✕</span>
        <span *ngIf="type === 'warning'">⚠</span>
        <span *ngIf="type === 'info'">ℹ</span>
      </div>
      <div class="alert-content">
        <strong *ngIf="titulo">{{ titulo }}</strong>
        <p>{{ mensagem }}</p>
      </div>
      <button class="close-btn" (click)="close()">×</button>
    </div>
  `,
  styles: [`
    .alert {
      display: flex;
      align-items: flex-start;
      padding: 15px 20px;
      border-radius: 4px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .alert-icon {
      margin-right: 15px;
      font-size: 20px;
      font-weight: bold;
    }

    .alert-content {
      flex: 1;
    }

    .alert-content strong {
      display: block;
      margin-bottom: 5px;
      font-size: 16px;
    }

    .alert-content p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      margin-left: 10px;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 1;
    }

    /* Success Alert */
    .alert.success {
      background: #d4edda;
      border-left: 4px solid #28a745;
      color: #155724;
    }

    .alert.success .alert-icon {
      color: #28a745;
    }

    /* Error Alert */
    .alert.error {
      background: #f8d7da;
      border-left: 4px solid #dc3545;
      color: #721c24;
    }

    .alert.error .alert-icon {
      color: #dc3545;
    }

    /* Warning Alert */
    .alert.warning {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      color: #856404;
    }

    .alert.warning .alert-icon {
      color: #ffc107;
    }

    /* Info Alert */
    .alert.info {
      background: #d1ecf1;
      border-left: 4px solid #17a2b8;
      color: #0c5460;
    }

    .alert.info .alert-icon {
      color: #17a2b8;
    }
  `]
})
export class AlertComponent {
  @Input() show: boolean = true;
  @Input() type: AlertType = 'info';
  @Input() titulo: string = '';
  @Input() mensagem: string = '';
  @Input() autoClose: boolean = false;
  @Input() autoCloseTime: number = 5000;
  @Output() onClose = new EventEmitter<void>();

  ngOnInit() {
    if (this.autoClose && this.show) {
      setTimeout(() => {
        this.close();
      }, this.autoCloseTime);
    }
  }

  close() {
    this.show = false;
    this.onClose.emit();
  }
}
