import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaI } from '../../../models/factura';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; // Importa MessageModule
import { FacturaService } from '../../../services/factura.service';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
import { ProductoService } from '../../../services/producto.service';
import { DetallefacturaService } from '../../../services/detallefactura.service';
import { DetalleFacturaI } from '../../../models/detalle_factura';

@Component({
  selector: 'app-crear-detalle-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, TreeSelectModule],
  templateUrl: './crear-detalle-factura.component.html',
  styleUrl: './crear-detalle-factura.component.css',
  providers: [MessageService]
})
export class CrearDetalleFacturaComponent {
  public form: FormGroup; // Declarar la propiedad form
  facturas: TreeNode[] = [];
  selectedFactura: TreeNode | undefined;

  Product: TreeNode[] = [];
  selectedProduct: TreeNode | undefined;

  // Inicializar clienteService y formBuilder usando `inject`
  detallefacturaService = inject(DetallefacturaService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  facturaService = inject(FacturaService);
  productoService = inject (ProductoService);
  constructor(
    // private messageService: MessageService,
    private router: Router,
  ) { 
    // Inicializar el formulario en el constructor
    this.form = this.formBuilder.group({
      cantidad: ['', [Validators.required]],
      precio_unitario: ['', [Validators.required]],
      subtotal: ['', [Validators.required]],
      factura: ['', [Validators.required]],
      producto: ['', [Validators.required]],
      
    });
  }

  ngOnInit(): void {
    this.getFactura();
    this.getProducto();
  }


  getFactura() {
    this.facturaService.getAllFacturas() 
      .subscribe((data: any) => {
        this.facturas = data.map((factura: any) => ({
          label: factura.cliente,
          data: factura.id
        }));
      });
  }

  getProducto() {
    this.productoService.getAllProducto() 
      .subscribe((data: any) => {
        this.Product = data.map((producto: any) => ({
          label: producto.nombre, 
          data: producto.id
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

    const formValue: DetalleFacturaI = this.form.value;
    formValue.factura = this.form.value.factura.data;
    formValue.producto = this.form.value.producto.data;
    this.detallefacturaService.createDetalleFactura(formValue).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Notificación',
          detail: 'Factura Creado',
          life: 5000
        });
        this.router.navigateByUrl('/detalles_facturas');
      },
      err => {
        console.error('Error al crear factura:', err);
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
    this.router.navigateByUrl('/detalles_facturas');
  }

  get cantidad() { return this.form.get('cantidad'); }
  get precio_unitario() { return this.form.get('precio_unitario'); }
  get subtotal() { return this.form.get('subtotal'); }
  get factura() { return this.form.get('factura'); }
  get producto() { return this.form.get('producto'); }

}
