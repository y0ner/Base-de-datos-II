import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { TipoProductoService } from '../../../services/tipo-producto.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { Component, inject } from '@angular/core';
import { ProductoI } from '../../../models/producto';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [InputTextModule, CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, FormsModule, TreeSelectModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
  providers: [MessageService]
})export class CrearProductoComponent {
  public form: FormGroup;
  tipoproducto: TreeNode[] = [];
  selectedTipoProducto: TreeNode | undefined;

  productoService = inject(ProductoService);
  formBuilder = inject(FormBuilder);
  messageService = inject(MessageService);
  tipoProductoService = inject(TipoProductoService);

  constructor(private router: Router) {
    this.form = this.formBuilder.group({
      tipoproducto: [null, Validators.required], // Cambiar a null para enviar el objeto completo
      nombre: ['', Validators.required],
      marca: [''],
      precio: [null, Validators.required],
      cantidad: [null, Validators.required],
      stockmin: [null, Validators.required] // Renombrado a "stockmin"
    });
  }
  

  ngOnInit(): void {
    this.getTipoProductos();
  }
  getTipoProductos() {
    this.tipoProductoService.getAllTipoProducto().subscribe((data: any) => {
      this.tipoproducto = data.map((tipo: any) => ({
        label: tipo.nombre,
        value: tipo.id // Cambia 'data' a 'value'
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
  
    const formValue = this.form.value;
  
    // Ajustar estructura para incluir tipoproducto como objeto
    const payload = {
      ...formValue,
      tipoproducto: { id: formValue.tipoproducto } // Crear el objeto esperado
    };
  
    this.productoService.createProducto(payload).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Notificación',
          detail: 'Producto Creado',
          life: 5000
        });
        this.router.navigateByUrl('/productos');
      },
      (err) => {
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
  get tipoproductoControl() { return this.form.get('tipoproducto'); }
  get marca() { return this.form.get('marca'); }
  get precio() { return this.form.get('precio'); }
  get cantidad() { return this.form.get('cantidad'); }
  get stock_minimo() { return this.form.get('stock_minimo'); }
}
