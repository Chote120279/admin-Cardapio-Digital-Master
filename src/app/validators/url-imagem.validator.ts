import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator for image URLs
 * Ensures the URL is valid and points to an image
 */
export function urlImagemValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate empty values, use Validators.required for that
    }

    const value = control.value.toString();

    // Check if it's a valid URL
    try {
      const url = new URL(value);
      
      // Check if it's http or https
      if (!['http:', 'https:'].includes(url.protocol)) {
        return { urlInvalida: { value: control.value, message: 'A URL deve começar com http:// ou https://' } };
      }

      // Check if URL ends with image extension
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const hasImageExtension = imageExtensions.some(ext => value.toLowerCase().endsWith(ext));

      if (!hasImageExtension) {
        return { naoImagem: { value: control.value, message: 'A URL deve apontar para uma imagem (.jpg, .png, .gif, etc.)' } };
      }

      return null;
    } catch (e) {
      return { urlInvalida: { value: control.value, message: 'A URL informada não é válida' } };
    }
  };
}
