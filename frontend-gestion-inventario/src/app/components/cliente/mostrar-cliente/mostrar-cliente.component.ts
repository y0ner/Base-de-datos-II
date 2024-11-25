import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteI } from '../../../models/cliente';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ClienteService } from '../../../services/cliente.service'
import { MessageService, ConfirmationService } from 'primeng/api'; // Importa los servicios necesarios
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 


@Component({
  selector: 'app-mostrar-cliente',
  standalone: true,
  imports: [CommonModule , TableModule, ButtonModule, CardModule, RouterModule, ConfirmDialogModule],
  templateUrl: './mostrar-cliente.component.html',
  styleUrl: './mostrar-cliente.component.css',
  providers: [MessageService, ConfirmationService] // Proporciona los servicios
})
export class MostrarClienteComponent implements OnInit {
  public clientes: ClienteI[] = []
  // messageService = inject(MessageService);
  // confirmationService = inject(ConfirmationService);

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private confirmationService: ConfirmationService, // Inyectar ConfirmationService
    private messageService: MessageService // Inyectar MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarClientes()
  }

  mostrarClientes() {
    this.clienteService.getAllCliente()
      .subscribe({
        next: (data) => {
          this.clientes = data
          console.log(this.clientes)
        }
      })
  }

  // eliminar(id: number): void {
  //   this.router.navigateByUrl('/clientes');
  //   this.clienteService.deleteCliente(id).subscribe(
  //     () => {
  //       // this.messageService.add({severity:'warn', summary: 'Notificación', detail: 'Cliente Eliminado', life:5000});
  //       this.mostrarClientes();
  //     },
  //     err => {
  //       console.log('error')
  //       this.router.navigateByUrl('/clientes');

  //     }
  //   );
  // }

  eliminar(id: number): void {
    // Muestra el cuadro de diálogo de confirmación
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this customer?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Lógica para eliminar el cliente
        this.clienteService.deleteCliente(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'customer deleted successfully',
              life: 3000
            });
            this.mostrarClientes(); // Actualiza la lista de clientes
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el cliente',
              life: 3000
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelado',
          detail: 'Eliminación cancelada',
          life: 3000
        });
      }
    });
  }
}