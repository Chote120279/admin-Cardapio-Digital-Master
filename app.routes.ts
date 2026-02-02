import { Routes } from '@angular/router';
import { OrdersComponent } from './views/admin/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/orders',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    children: [
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  }
];
