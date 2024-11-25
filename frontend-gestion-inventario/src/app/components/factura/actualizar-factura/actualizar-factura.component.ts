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
import { FacturaI } from '../../../models/factura';
import { ClienteService } from '../../../services/cliente.service';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-actualizar-factura',
  standalone: true,
  imports: [InputTextModule, CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, TreeSelectModule],
  templateUrl: './actualizar-factura.component.html',
  styleUrl: './actualizar-factura.component.css',
  providers: [MessageService]
})
export class ActualizarFacturaComponent implements OnInit{
  public id: number =0;
  //public form: FormGroup;
  customers: TreeNode[] = [];
  selectedClient: TreeNode | undefined;

  facturaService = inject(FacturaService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  clienteService = inject(ClienteService);

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    total: ['', [Validators.required]],
    customer: ['', [Validators.required]],
  });
  constructor(
    // private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getFactura(this.id);
    this.getClientes();

  }

  getClientes() {
    this.clienteService.getAllCliente() 
      .subscribe((data: any) => {
        this.customers = data.map((customer: any) => ({
          label: customer.name, 
          data: customer.id
        }));
      });
  }

  getFactura(id: number){
    this.facturaService.getOneFactura(id)
    .subscribe({
      next: (data) => {
        this.form.patchValue(data)
        
      }
    })
  }

  onSubmit(): void {
    const formValue: FacturaI = this.form.value;
    const id: number =  this.form.value.id
    formValue.customer = this.form.value.customer.data;
    this.facturaService.updateFactura(id, formValue).subscribe(
      () => {
  
        this.router.navigateByUrl('facturas');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/facturas');
  }

  get total() { return this.form.get('total'); }
  get customer() { return this.form.get('customer'); }
}
