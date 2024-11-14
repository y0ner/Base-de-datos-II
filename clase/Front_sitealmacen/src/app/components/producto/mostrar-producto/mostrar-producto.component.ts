import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoI } from '../../../models/producto';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProductoService } from '../../../services/producto.service';
import { MessageService, ConfirmationService } from 'primeng/api'; // Importa los servicios necesarios
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 


@Component({
  selector: 'app-mostrar-producto',
  standalone: true,
  imports: [CommonModule , TableModule, ButtonModule, CardModule, RouterModule, ConfirmDialogModule],
  templateUrl: './mostrar-producto.component.html',
  styleUrl: './mostrar-producto.component.css',
  providers: [MessageService, ConfirmationService] // Proporciona los servicios
})
export class MostrarProductoComponent implements OnInit {
  public productos: ProductoI[] = []
  // messageService = inject(MessageService);
  // confirmationService = inject(ConfirmationService);

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private confirmationService: ConfirmationService, // Inyectar ConfirmationService
    private messageService: MessageService // Inyectar MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarProductos()
  }

  mostrarProductos() {
    this.productoService.getAllProducto()
      .subscribe({
        next: (data) => {
          this.productos = data
          console.log(this.productos)
        }
      })
  }


  eliminar(id: number): void {
    // Muestra el cuadro de diálogo de confirmación
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este Producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Lógica para eliminar el cliente
        this.productoService.deleteProducto(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto eliminado correctamente',
              life: 3000
            });
            this.mostrarProductos(); // Actualiza la lista de productos
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el Producto',
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
