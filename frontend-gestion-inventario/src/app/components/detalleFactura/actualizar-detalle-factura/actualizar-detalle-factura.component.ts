import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; // Importa MessageModule
import { FacturaService } from '../../../services/factura.service';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
import { DetallefacturaService } from '../../../services/detallefactura.service';
import { ProductoService } from '../../../services/producto.service';
import { DetalleFacturaI } from '../../../models/detalle_factura';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-actualizar-detalle-factura',
  standalone: true,
  imports: [InputTextModule,CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, TreeSelectModule],
  templateUrl: './actualizar-detalle-factura.component.html',
  styleUrl: './actualizar-detalle-factura.component.css',
  providers: [MessageService]
})
export class ActualizarDetalleFacturaComponent {
  public id: number =0;
  
  facturas: TreeNode[] = [];
  selectedFactura: TreeNode | undefined;

  Products: TreeNode[] = [];
  selectedProduct: TreeNode | undefined;

  detallefacturaService = inject(DetallefacturaService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  facturaService = inject(FacturaService);
  productoService = inject (ProductoService);

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    quantity: ['', [Validators.required]],
    unit_price: ['', [Validators.required]],
    subtotal: ['', [Validators.required]],
    invoice: ['', [Validators.required]],
    product: ['', [Validators.required]],

  });
  constructor(
    // private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getDetalleFactura(this.id);
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

  getDetalleFactura(id: number){
    this.detallefacturaService.getOneDetalleFactura(id)
    .subscribe({
      next: (data) => {
        this.form.patchValue(data)
        
      }
    })
  }

  onSubmit(): void {
    const formValue: DetalleFacturaI = this.form.value;
    const id: number =  this.form.value.id
    formValue.invoice = this.form.value.invoice.data;
    formValue.product = this.form.value.product.data;
    this.detallefacturaService.updateDetalleFactura(id, formValue).subscribe(
      () => {
  
        this.router.navigateByUrl('detalles_facturas');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
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
