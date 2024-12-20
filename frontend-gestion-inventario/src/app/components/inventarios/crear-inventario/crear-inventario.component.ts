import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InventarioService } from '../../../services/inventario.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { ProductoService } from '../../../services/producto.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-crear-inventario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule, CardModule, RouterModule, DropdownModule, TreeSelectModule],
  templateUrl: './crear-inventario.component.html',
  styleUrls: ['./crear-inventario.component.css'],
  providers: [MessageService]
})
export class CrearInventarioComponent implements OnInit {
  inventarioForm: FormGroup; // Formulario para crear inventario
  private inventarioService = inject(InventarioService); // Inyección de InventarioService
  private messageService = inject(MessageService); // Inyección de MessageService
  private router = inject(Router); // Inyección de Router
  productoService = inject(ProductoService);
  Products: TreeNode[] = [];

  constructor(private fb: FormBuilder) {
    this.inventarioForm = this.fb.group({
      product: ['', Validators.required],
      movement_type: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      movement_date: ['', Validators.required],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.getProducto(); // Inicializa los productos al cargar el componente
  }

  getProducto() {
    this.productoService.getAllProducto()
      .subscribe((data: any) => {
        this.Products = data.map((product: any) => ({
          label: product.name,
          data: product.id
        }));
      });
  }

  crearInventario(): void {
    if (this.inventarioForm.valid) {
      // Asigna el id del producto seleccionado en el formulario
      const formValue = { ...this.inventarioForm.value };
      formValue.product = this.inventarioForm.value.product.data;

      this.inventarioService.createInventario(formValue).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Inventario creado con éxito' });
          this.router.navigate(['/inventarios']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el inventario' });
        }
      });
    }
  }
}
