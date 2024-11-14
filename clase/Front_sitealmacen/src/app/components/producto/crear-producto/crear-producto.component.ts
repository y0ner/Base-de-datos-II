import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { MessageService } from 'primeng/api';
import {  Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; // Importa MessageModule
import { Component, inject } from '@angular/core';
import { ProductoI } from '../../../models/producto';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, FormsModule, TreeSelectModule ],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
  providers: [MessageService]
  
})
export class CrearProductoComponent {
  public form: FormGroup; // Declarar la propiedad form
  categories: TreeNode[] = [];
  selectedCategory: TreeNode | undefined;

  // Inicializar clienteService y formBuilder usando `inject`
  productoService = inject(ProductoService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  categoriaService = inject(CategoriaService);

  constructor(
    // private messageService: MessageService,
    private router: Router,
  ) { 
    
    this.form = this.formBuilder.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [null, Validators.required],
      stock_actual: [null, Validators.required],
      stock_minimo: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getAllCategoria() 
      .subscribe((data: any) => {
        this.categories = data.map((categoria: any) => ({
          label: categoria.nombre, 
          data: categoria.id
        }));
      });
  }

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

    const formValue: ProductoI = this.form.value;
    formValue.categoria = this.form.value.categoria.data;
    this.productoService.createProducto(formValue).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Notificación',
          detail: 'Producto Creado',
          life: 5000
        });
        this.router.navigateByUrl('/productos');
      },
      err => {
        console.error('Error al crear producto:', err);
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
    this.router.navigateByUrl('/productos');
  }

  get nombre() { return this.form.get('nombre'); }
  get categoria() { return this.form.get('categoria'); }
  get descripcion() { return this.form.get('descripcion'); }
  get precio() { return this.form.get('precio'); }
  get stock_actual() { return this.form.get('stock_actual'); }
  get stock_minimo() { return this.form.get('stock_minimo'); }

}
