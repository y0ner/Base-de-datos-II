import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteI } from '../../../models/cliente';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; // Importa MessageModule
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [InputTextModule,CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule],
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
  providers: [MessageService]
  
})
export class CrearClienteComponent implements OnInit {
  public form: FormGroup; // Declarar la propiedad form

  // Inicializar clienteService y formBuilder usando `inject`
  clienteService = inject(ClienteService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);

  constructor(
    // private messageService: MessageService,
    private router: Router,
  ) { 
    // Inicializar el formulario en el constructor
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // No es necesario inicializar el formulario aquí, ya se ha hecho en el constructor
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

    const formValue: ClienteI = this.form.value;
    console.log(formValue);
    this.clienteService.createCliente(formValue).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Notificación',
          detail: 'Cliente Creado',
          life: 5000
        });
        this.router.navigateByUrl('/clientes');
      },
      err => {
        console.error('Error al crear cliente:', err);
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
    this.router.navigateByUrl('/clientes');
  }

  get nombre() { return this.form.get('nombre'); }
  
  get direccion() { return this.form.get('direccion'); }

  get telefono() { return this.form.get('telefono'); }

  get email() { return this.form.get('email'); }

}
