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
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TipoProductoService } from '../../../services/tipo-producto.service';

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
  tipoproductos: { label: string; data: number }[] = [];
  selectedTipoProducto: TreeNode | undefined;

  productoService = inject(ProductoService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  tipoProductoService = inject(TipoProductoService);

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    stock_actual: ['', [Validators.required]],
    stock_minimo: ['', [Validators.required]],
    tipoproducto: ['', [Validators.required]]
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
    this.getTipoProductos();

  }


  getTipoProductos() {
    this.tipoProductoService.getAllTipoProducto()
      .subscribe((data: any) => {
        this.tipoproductos = data.map((tipo: any) => ({
          label: tipo.nombre,
          data: tipo.id
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
    formValue.tipoproducto = this.form.value.tipoproducto.data; // Añade esta línea
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
  get tipoproducto() { return this.form.get('tipoproducto'); } 
}