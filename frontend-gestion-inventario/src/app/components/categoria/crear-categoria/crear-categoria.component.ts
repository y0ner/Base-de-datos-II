import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CategoriaI } from '../../../models/categoria';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; 
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [InputTextModule,CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css',
  providers: [MessageService]
})

export class CrearCategoriaComponent {

  public form: FormGroup;

  // Inicializar categoriaService y formBuilder usando `inject`
  categoriaService = inject(CategoriaService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);

  constructor(
    // private messageService: MessageService,
    private router: Router,
  ) { 
    // Inicializar el formulario en el constructor
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  // ngOnInit(): void {
  //   // No es necesario inicializar el formulario aquí, ya se ha hecho en el constructor
  // }

  onSubmit(): void {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario inválido',
        life: 5000
      });
      return;
    }

    const formValue: CategoriaI = this.form.value;
    console.log(formValue);
    this.categoriaService.createCategoria(formValue).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Notificación',
          detail: 'Categoria Creada',
          life: 5000
        });
        this.router.navigateByUrl('/categorias');
      },
      err => {
        console.error('Error al crear la categoria:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se ha creado correctamente',
          life: 5000
        });
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/categorias');
  }

  get name() { return this.form.get('nombre'); }
  get description() { return this.form.get('descripcion'); }
}
