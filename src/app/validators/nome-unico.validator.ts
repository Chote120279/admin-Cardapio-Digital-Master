import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, switchMap, first } from 'rxjs/operators';
import { ProdutoService } from '../services/produto.service';

/**
 * Async validator to check if product name is unique
 * @param produtoService Product service instance
 * @param currentId Current product ID (when editing)
 */
export function nomeUnicoValidator(produtoService: ProdutoService, currentId?: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return control.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => 
        produtoService.listarProdutos().pipe(
          map(produtos => {
            const nomeExiste = produtos.some(p => 
              p.nome.toLowerCase() === value.toLowerCase() && 
              p.id !== currentId
            );
            return nomeExiste ? { nomeJaExiste: { value, message: 'Já existe um produto com este nome' } } : null;
          }),
          catchError(() => of(null))
        )
      ),
      first()
    );
  };
}
