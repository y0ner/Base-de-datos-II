import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InventarioService } from '../../../services/inventario.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InventarioI } from '../../../models/inventario';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { ProductoService } from '../../../services/producto.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-actualizar-inventario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule, CardModule, RouterModule, DropdownModule, TreeSelectModule],
  templateUrl: './actualizar-inventario.component.html',
  styleUrls: ['./actualizar-inventario.component.css'],
  providers: [MessageService]
})
export class ActualizarInventarioComponent implements OnInit {
  public inventarioId: number = 0;
  public Product: TreeNode[] = [];
  public selectedProduct: TreeNode | undefined;
  public inventarioForm: FormGroup;
  
  private inventarioService = inject(InventarioService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.inventarioForm = this.formBuilder.group({
      id: [''],
      producto: ['', Validators.required],
      tipo_movimiento: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      fecha_movimiento: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.inventarioId = Number(this.route.snapshot.params['id']);
    if (this.inventarioId) {
      this.getInventario(this.inventarioId);
    }
    this.getProducto();
  }

  getProducto() {
    this.productoService.getAllProducto().subscribe((data: any) => {
      this.Product = data.map((producto: any) => ({
        label: producto.nombre,
        data: producto.id
      }));
    });
  }

  getInventario(id: number) {
    this.inventarioService.getInventarioById(id).subscribe((data: InventarioI) => {
      this.inventarioForm.patchValue({
        id: data.id,
        producto: { data: data.producto },  // Ajustar para TreeSelect
        tipo_movimiento: data.tipo_movimiento,
        cantidad: data.cantidad,
        fecha_movimiento: data.fecha_movimiento,
        observaciones: data.observaciones
      });
    });
  }

  actualizarInventario(): void {
    const formValue = { ...this.inventarioForm.value };
    formValue.producto = this.inventarioForm.value.producto.data; // Obtener ID del producto seleccionado

    this.inventarioService.updateInventario(this.inventarioId, formValue).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Inventario actualizado con éxito' });
        this.router.navigate(['/inventarios']);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el inventario' });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/inventarios']);
  }

  get producto() { return this.inventarioForm.get('producto'); }
  get tipo_movimiento() { return this.inventarioForm.get('tipo_movimiento'); }
  get cantidad() { return this.inventarioForm.get('cantidad'); }
  get fecha_movimiento() { return this.inventarioForm.get('fecha_movimiento'); }
  get observaciones() { return this.inventarioForm.get('observaciones'); }
}
