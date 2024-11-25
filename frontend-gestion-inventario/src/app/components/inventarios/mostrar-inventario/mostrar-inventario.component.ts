import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioI } from '../../../models/inventario';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InventarioService } from '../../../services/inventario.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 

@Component({
  selector: 'app-mostrar-inventario',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, RouterModule, ConfirmDialogModule],
  templateUrl: './mostrar-inventario.component.html',
  styleUrls: ['./mostrar-inventario.component.css'],
  providers: [MessageService, ConfirmationService] 
})
export class MostrarInventarioComponent implements OnInit {
  inventarios: InventarioI[] = []; // Definir el array de inventarios
  private inventarioService = inject(InventarioService); // Inyección de InventarioService
  private messageService = inject(MessageService); // Inyección de MessageService
  private confirmationService = inject(ConfirmationService); // Inyección de ConfirmationService

  ngOnInit(): void {
    // Llamar al método correcto del servicio
    this.inventarioService.getAllInventarios().subscribe((data: InventarioI[]) => {
      this.inventarios = data;
    });
  }
  
  confirmarEliminacion(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this invoice?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarInventario(id);
      }
    });
  }

  eliminarInventario(id: number): void {
    this.inventarioService.deleteInventario(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Inventario eliminado con éxito' });
        this.inventarios = this.inventarios.filter(inventario => inventario.id !== id); // Actualiza la lista de inventarios
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el inventario' });
      }
    });
  }
}
