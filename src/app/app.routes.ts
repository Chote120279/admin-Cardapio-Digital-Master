import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { OrdersComponent } from './views/admin/orders/orders.component';
import { ProductsComponent } from './views/admin/products/products.component';
import { CategoriesComponent } from './views/admin/categories/categories.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/products',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      }
    ]
  }
];
