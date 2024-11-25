import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; // Importa MessageModule
import { ProductoService } from '../../../services/producto.service';
import { ProductoI } from '../../../models/producto';
import { CategoriaService } from '../../../services/categoria.service';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [InputTextModule,CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, TreeSelectModule ],
  templateUrl: './actualizar-producto.component.html',
  styleUrl: './actualizar-producto.component.css',
  providers: [MessageService]
})

export class ActualizarProductoComponent implements OnInit{
  public id: number =0;
  //public form: FormGroup;
  categories: TreeNode[] = [];
  selectedCategory: TreeNode | undefined;

  productoService = inject(ProductoService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  categoriaService = inject(CategoriaService);

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    current_stock: ['', [Validators.required]],
    minimum_stock: ['', [Validators.required]],
    category: ['', [Validators.required]]
  });
  constructor(
    // private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getDatos(this.id);
    this.getCategorias();

  }

  getCategorias() {
    this.categoriaService.getAllCategoria() 
      .subscribe((data: any) => {
        this.categories = data.map((category: any) => ({
          label: category.name, 
          data: category.id
        }));
      });
  }

  getDatos(id: number){
    this.productoService.getOneProducto(id)
    .subscribe({
      next: (data) => {
        this.form.patchValue(data)
      }
    })
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
    formValue.category = this.form.value.category.data; // Añade esta línea
    const id: number = this.form.value.id;
  
    this.productoService.updateProducto(id, formValue).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Notificación',
          detail: 'Producto actualizado',
          life: 5000
        });
        this.router.navigateByUrl('/productos');
      },
      err => {
        console.error('Error al actualizar producto:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se ha actualizado correctamente',
          life: 5000
        });
      }
    );
  }
  

  cancel() {
    this.router.navigateByUrl('/productos');
  }

  get nombre() { return this.form.get('nombre'); }
  get descripcion() { return this.form.get('descripcion'); }
  get precio() { return this.form.get('precio'); }
  get stock_actual() { return this.form.get('email'); }
  get stock_minimo() { return this.form.get('stock_minimo'); }
  get categoria() { return this.form.get('categoria'); }
}