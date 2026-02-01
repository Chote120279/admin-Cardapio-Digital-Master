import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator for price values
 * Ensures the value is a positive number
 */
export function precoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value && control.value !== 0) {
      return null; // Don't validate empty values, use Validators.required for that
    }

    const value = parseFloat(control.value);

    if (isNaN(value)) {
      return { precoInvalido: { value: control.value, message: 'O preço deve ser um número válido' } };
    }

    if (value < 0) {
      return { precoNegativo: { value: control.value, message: 'O preço não pode ser negativo' } };
    }

    if (value === 0) {
      return { precoZero: { value: control.value, message: 'O preço deve ser maior que zero' } };
    }

    // Check if has more than 2 decimal places
    const decimalPlaces = (value.toString().split('.')[1] || '').length;
    if (decimalPlaces > 2) {
      return { precoDecimais: { value: control.value, message: 'O preço deve ter no máximo 2 casas decimais' } };
    }

    return null;
  };
}
