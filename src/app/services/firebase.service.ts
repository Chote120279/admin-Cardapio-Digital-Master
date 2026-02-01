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

  // Problem: Missing atualizarConfig method
  // This should be added as per the problem statement
}
