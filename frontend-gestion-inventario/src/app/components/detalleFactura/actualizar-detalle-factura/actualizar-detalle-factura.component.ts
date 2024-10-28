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
@Component({
  selector: 'app-actualizar-detalle-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, TreeSelectModule],
  templateUrl: './actualizar-detalle-factura.component.html',
  styleUrl: './actualizar-detalle-factura.component.css',
  providers: [MessageService]
})
export class ActualizarDetalleFacturaComponent {
  public id: number =0;
  
  facturas: TreeNode[] = [];
  selectedFactura: TreeNode | undefined;

  Product: TreeNode[] = [];
  selectedProduct: TreeNode | undefined;

  detallefacturaService = inject(DetallefacturaService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  facturaService = inject(FacturaService);
  productoService = inject (ProductoService);

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    cantidad: ['', [Validators.required]],
    precio_unitario: ['', [Validators.required]],
    subtotal: ['', [Validators.required]],
    factura: ['', [Validators.required]],
    producto: ['', [Validators.required]],

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
        this.facturas = data.map((factura: any) => ({
          label: `${factura.cliente.nombre} - ${factura.fecha_factura}`, // Ajusta lo que quieres mostrar
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
    formValue.factura = this.form.value.factura.data;
    formValue.producto = this.form.value.producto.data;
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

  get cantidad() { return this.form.get('cantidad'); }
  get precio_unitario() { return this.form.get('precio_unitario'); }
  get subtotal() { return this.form.get('subtotal'); }
  get factura() { return this.form.get('factura'); }
  get producto() { return this.form.get('producto'); }
}
