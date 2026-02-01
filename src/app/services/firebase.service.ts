import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {}

  // Other methods...
  getData() {
    return {};
  }

  // Fixed: Added missing atualizarConfig method
  async atualizarConfig(config: any): Promise<void> {
    // Implementation to update Firebase configuration
    console.log('Updating config:', config);
    // Add your Firebase config update logic here
    return Promise.resolve();
  }
}
