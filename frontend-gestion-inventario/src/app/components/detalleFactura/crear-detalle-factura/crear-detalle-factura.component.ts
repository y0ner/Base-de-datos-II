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
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-crear-detalle-factura',
  standalone: true,
  imports: [InputTextModule,CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, TreeSelectModule],
  templateUrl: './crear-detalle-factura.component.html',
  styleUrl: './crear-detalle-factura.component.css',
  providers: [MessageService]
})
export class CrearDetalleFacturaComponent {
  public form: FormGroup; // Declarar la propiedad form
  facturas: TreeNode[] = [];
  selectedFactura: TreeNode | undefined;

  Products: TreeNode[] = [];
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
      quantity: ['', [Validators.required]],
      unit_price: ['', [Validators.required]],
      subtotal: ['', [Validators.required]],
      invoice: ['', [Validators.required]],
      product: ['', [Validators.required]],
      
    });
  }

  ngOnInit(): void {
    this.getFactura();
    this.getProducto();
  }


  getFactura() {
    this.facturaService.getAllFacturas() 
      .subscribe((data: any) => {
        this.facturas = data.map((invoice: any) => ({
          label: `${invoice.customer.name} - ${invoice.invoice_date}`, // Ajusta lo que quieres mostrar
          data: invoice.id
        }));
      });
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
    formValue.invoice = this.form.value.invoice.data;
    formValue.product = this.form.value.product.data;
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

  get quantity() { return this.form.get('quantity'); }
  get unit_price() { return this.form.get('unit_price'); }
  get subtotal() { return this.form.get('subtotal'); }
  get invoice() { return this.form.get('invoice'); }
  get product() { return this.form.get('product'); }

}
