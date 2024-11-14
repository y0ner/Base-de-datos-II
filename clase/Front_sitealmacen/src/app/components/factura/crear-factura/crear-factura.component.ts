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
import { ClienteService } from '../../../services/cliente.service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, TreeSelectModule],
  templateUrl: './crear-factura.component.html',
  styleUrl: './crear-factura.component.css',
  providers: [MessageService]
})
export class CrearFacturaComponent {
  public form: FormGroup; // Declarar la propiedad form
  client: TreeNode[] = [];
  selectedClient: TreeNode | undefined;

  // Inicializar clienteService y formBuilder usando `inject`
  facturaService = inject(FacturaService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  clienteService = inject(ClienteService);

  constructor(
    // private messageService: MessageService,
    private router: Router,
  ) { 
    // Inicializar el formulario en el constructor
    this.form = this.formBuilder.group({
      total: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      
    });
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getAllCliente() 
      .subscribe((data: any) => {
        this.client = data.map((cliente: any) => ({
          label: cliente.nombre, 
          data: cliente.id
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

    const formValue: FacturaI = this.form.value;
    formValue.cliente = this.form.value.cliente.data;
    this.facturaService.createFactura(formValue).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Notificación',
          detail: 'Factura Creado',
          life: 5000
        });
        this.router.navigateByUrl('/facturas');
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
    this.router.navigateByUrl('/facturas');
  }

  get total() { return this.form.get('total'); }
  get cliente() { return this.form.get('cliente'); }

}
