import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { MessageService, ConfirmationService } from 'primeng/api'; // Importa los servicios necesarios
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { DetalleFacturaI } from '../../../models/detalle_factura';
import { DetallefacturaService } from '../../../services/detallefactura.service';

@Component({
  selector: 'app-mostrar-detalle-factura',
  standalone: true,
  imports: [CommonModule , TableModule, ButtonModule, CardModule, RouterModule, ConfirmDialogModule],
  templateUrl: './mostrar-detalle-factura.component.html',
  styleUrl: './mostrar-detalle-factura.component.css',
  providers: [MessageService, ConfirmationService] // Proporciona los servicios
})
export class MostrarDetalleFacturaComponent implements OnInit{
  public detallesfacturas: DetalleFacturaI[] = []
  // messageService = inject(MessageService);
  // confirmationService = inject(ConfirmationService);

  constructor(
    private detallefacturaService: DetallefacturaService,
    private router: Router,
    private confirmationService: ConfirmationService, // Inyectar ConfirmationService
    private messageService: MessageService // Inyectar MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarDetallesFacturas()
  }

  mostrarDetallesFacturas() {
    this.detallefacturaService.getAllDetalleFacturas()
      .subscribe({
        next: (data) => {
          this.detallesfacturas = data
          
        }
      })
  }


  eliminar(id: number): void {
    // Muestra el cuadro de diálogo de confirmación
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar los detalles de la factura?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Lógica para eliminar el cliente
        this.detallefacturaService.deleteDetalleFactura(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Factura eliminada correctamente',
              life: 3000
            });
            this.mostrarDetallesFacturas(); // Actualiza la lista de facturas
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
