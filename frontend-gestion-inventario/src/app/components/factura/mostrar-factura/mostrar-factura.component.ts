import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaI } from '../../../models/factura';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FacturaService } from '../../../services/factura.service';
import { MessageService, ConfirmationService } from 'primeng/api'; // Importa los servicios necesarios
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 

@Component({
  selector: 'app-mostrar-factura',
  standalone: true,
  imports: [CommonModule , TableModule, ButtonModule, CardModule, RouterModule, ConfirmDialogModule],
  templateUrl: './mostrar-factura.component.html',
  styleUrl: './mostrar-factura.component.css',
  providers: [MessageService, ConfirmationService] // Proporciona los servicios
})
export class MostrarFacturaComponent implements OnInit{
  public facturas: FacturaI[] = []
  // messageService = inject(MessageService);
  // confirmationService = inject(ConfirmationService);

  constructor(
    private facturaService: FacturaService,
    private router: Router,
    private confirmationService: ConfirmationService, // Inyectar ConfirmationService
    private messageService: MessageService // Inyectar MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarFacturas()
  }

  mostrarFacturas() {
    this.facturaService.getAllFacturas()
      .subscribe({
        next: (data) => {
          this.facturas = data
          
        }
      })
  }


  eliminar(id: number): void {
    // Muestra el cuadro de diálogo de confirmación
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this invoice?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Lógica para eliminar el cliente
        this.facturaService.deleteFactura(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Factura eliminada correctamente',
              life: 3000
            });
            this.mostrarFacturas(); // Actualiza la lista de facturas
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la Factura',
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
