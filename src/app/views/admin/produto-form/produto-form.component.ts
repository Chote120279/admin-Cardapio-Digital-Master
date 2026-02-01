import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService, Produto } from '../../../services/produto.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-produto-form',
  template: `
    <div class="form-container">
      <div class="header">
        <h1>{{ isEditMode ? 'Editar Produto' : 'Novo Produto' }}</h1>
        <button class="btn-back" (click)="voltar()">← Voltar</button>
      </div>

      <form [formGroup]="produtoForm" (ngSubmit)="salvar()" class="produto-form">
        <div class="form-group">
          <label for="nome">Nome do Produto *</label>
          <input 
            id="nome"
            type="text" 
            formControlName="nome"
            placeholder="Ex: Pizza Margherita"
            [class.error]="isFieldInvalid('nome')"
          >
          <span class="error-message" *ngIf="isFieldInvalid('nome')">
            Nome é obrigatório (mínimo 3 caracteres)
          </span>
        </div>

        <div class="form-group">
          <label for="descricao">Descrição *</label>
          <textarea 
            id="descricao"
            formControlName="descricao"
            placeholder="Descreva o produto..."
            rows="4"
            [class.error]="isFieldInvalid('descricao')"
          ></textarea>
          <span class="error-message" *ngIf="isFieldInvalid('descricao')">
            Descrição é obrigatória
          </span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="preco">Preço (R$) *</label>
            <input 
              id="preco"
              type="number" 
              formControlName="preco"
              placeholder="0.00"
              step="0.01"
              min="0"
              [class.error]="isFieldInvalid('preco')"
            >
            <span class="error-message" *ngIf="isFieldInvalid('preco')">
              Preço é obrigatório (valor positivo)
            </span>
          </div>

          <div class="form-group">
            <label for="categoria">Categoria *</label>
            <select 
              id="categoria"
              formControlName="categoria"
              [class.error]="isFieldInvalid('categoria')"
            >
              <option value="">Selecione...</option>
              <option value="entrada">Entrada</option>
              <option value="principal">Prato Principal</option>
              <option value="bebida">Bebida</option>
              <option value="sobremesa">Sobremesa</option>
            </select>
            <span class="error-message" *ngIf="isFieldInvalid('categoria')">
              Categoria é obrigatória
            </span>
          </div>
        </div>

        <div class="form-group">
          <label>Imagem do Produto *</label>
          <div class="image-upload">
            <input 
              type="file" 
              id="imagem"
              accept="image/*"
              (change)="onFileSelected($event)"
              #fileInput
            >
            <button type="button" class="btn-upload" (click)="fileInput.click()">
              Escolher Imagem
            </button>
            <span class="file-name" *ngIf="selectedFileName">{{ selectedFileName }}</span>
          </div>
          <div class="image-preview" *ngIf="imagePreview">
            <img [src]="imagePreview" alt="Preview">
          </div>
          <span class="error-message" *ngIf="isFieldInvalid('imagemUrl')">
            Imagem é obrigatória
          </span>
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input type="checkbox" formControlName="disponivel">
            Produto disponível para venda
          </label>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="voltar()">Cancelar</button>
          <button type="submit" class="btn-save" [disabled]="!produtoForm.valid || uploading">
            {{ uploading ? 'Salvando...' : 'Salvar Produto' }}
          </button>
        </div>

        <div class="error-alert" *ngIf="errorMessage">
          <p>{{ errorMessage }}</p>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
    }

    .btn-back {
      padding: 10px 20px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-back:hover {
      background: #5a6268;
    }

    .produto-form {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    input[type="text"],
    input[type="number"],
    textarea,
    select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.2s;
    }

    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
      border-color: #007bff;
    }

    input.error,
    textarea.error,
    select.error {
      border-color: #dc3545;
    }

    .error-message {
      display: block;
      color: #dc3545;
      font-size: 13px;
      margin-top: 5px;
    }

    .image-upload {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    input[type="file"] {
      display: none;
    }

    .btn-upload {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-upload:hover {
      background: #0056b3;
    }

    .file-name {
      color: #666;
      font-size: 14px;
    }

    .image-preview {
      margin-top: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
      max-width: 300px;
    }

    .image-preview img {
      width: 100%;
      height: auto;
      display: block;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .checkbox-group input[type="checkbox"] {
      width: auto;
      margin-right: 10px;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }

    .btn-cancel,
    .btn-save {
      padding: 12px 30px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
    }

    .btn-cancel {
      background: #6c757d;
      color: white;
    }

    .btn-cancel:hover {
      background: #5a6268;
    }

    .btn-save {
      background: #28a745;
      color: white;
    }

    .btn-save:hover:not(:disabled) {
      background: #218838;
    }

    .btn-save:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .error-alert {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
      padding: 12px;
      border-radius: 4px;
      margin-top: 15px;
    }

    .error-alert p {
      margin: 0;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn-cancel,
      .btn-save {
        width: 100%;
      }
    }
  `]
})
export class ProdutoFormComponent implements OnInit {
  produtoForm: FormGroup;
  isEditMode: boolean = false;
  produtoId: string | null = null;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  imagePreview: string = '';
  uploading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagemUrl: ['', Validators.required],
      disponivel: [true]
    });
  }

  ngOnInit() {
    this.produtoId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.produtoId;

    if (this.isEditMode && this.produtoId) {
      this.carregarProduto(this.produtoId);
    }
  }

  carregarProduto(id: string) {
    this.produtoService.obterProduto(id).subscribe(
      produto => {
        this.produtoForm.patchValue(produto);
        this.imagePreview = produto.imagemUrl;
      },
      error => {
        console.error('Erro ao carregar produto:', error);
        alert('Erro ao carregar produto');
        this.voltar();
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      // Preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async salvar() {
    if (this.produtoForm.invalid) {
      this.markFormGroupTouched(this.produtoForm);
      return;
    }

    this.uploading = true;

    try {
      let imagemUrl = this.produtoForm.value.imagemUrl;

      // Upload image if a new one was selected
      if (this.selectedFile) {
        const timestamp = Date.now();
        const fileName = `produtos/${timestamp}_${this.selectedFile.name}`;
        imagemUrl = await this.firebaseService.uploadImagem(this.selectedFile, fileName);
      }

      const produtoData: any = {
        ...this.produtoForm.value,
        imagemUrl,
        updatedAt: new Date()
      };

      // Only set createdAt for new products
      if (!this.isEditMode) {
        produtoData.createdAt = new Date();
      }

      if (this.isEditMode && this.produtoId) {
        await this.produtoService.atualizarProduto(this.produtoId, produtoData);
        console.log('Produto atualizado com sucesso!');
      } else {
        await this.produtoService.criarProduto(produtoData as Produto);
        console.log('Produto criado com sucesso!');
      }

      this.voltar();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      this.errorMessage = 'Erro ao salvar produto. Verifique os dados e tente novamente.';
    } finally {
      this.uploading = false;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.produtoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  voltar() {
    this.router.navigate(['/admin/produtos']);
  }
}
