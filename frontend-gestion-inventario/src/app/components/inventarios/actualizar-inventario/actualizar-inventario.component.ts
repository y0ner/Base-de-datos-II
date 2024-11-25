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
  public Products: TreeNode[] = [];
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
      product: ['', Validators.required],
      movement_type: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      movement_date: ['', Validators.required],
      remarks: ['']
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
      this.Products = data.map((product: any) => ({
        label: product.name,
        data: product.id
      }));
    });
  }

  getInventario(id: number) {
    this.inventarioService.getInventarioById(id).subscribe((data: InventarioI) => {
      this.inventarioForm.patchValue({
        id: data.id,
        product: { data: data.product },  // Ajustar para TreeSelect
        movement_type: data.movement_type,
        quantity: data.quantity,
        movement_date: data.movement_date,
        remarks: data.remarks
      });
    });
  }

  actualizarInventario(): void {
    const formValue = { ...this.inventarioForm.value };
    formValue.product = this.inventarioForm.value.product.data; // Obtener ID del producto seleccionado

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

  get product() { return this.inventarioForm.get('product'); }
  get movement_type() { return this.inventarioForm.get('movement_type'); }
  get quantity() { return this.inventarioForm.get('quantity'); }
  get movement_date() { return this.inventarioForm.get('movement_date'); }
  get remarks() { return this.inventarioForm.get('remarks'); }
}
