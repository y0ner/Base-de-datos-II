import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CategoriaService } from '../../../services/categoria.service';
import { MessageService, ConfirmationService } from 'primeng/api'; // Importa los servicios necesarios
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { CategoriaI } from '../../../models/categoria';

@Component({
  selector: 'app-mostrar-categoria',
  standalone: true,
  imports: [CommonModule , TableModule, ButtonModule, CardModule, RouterModule, ConfirmDialogModule],
  templateUrl: './mostrar-categoria.component.html',
  styleUrl: './mostrar-categoria.component.css',
  providers: [MessageService, ConfirmationService] // Proporciona los servicios
})
export class MostrarCategoriaComponent implements OnInit{
  [x: string]: any;
  public categorias: CategoriaI[] = []

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private confirmationService: ConfirmationService, // Inyectar ConfirmationService
    private messageService: MessageService // Inyectar MessageService
  ) { }

  ngOnInit(): void {
    this.mostrarCategoria()
  }

  mostrarCategoria() {
    this.categoriaService.getAllCategoria()
      .subscribe({
        next: (data) => {
          this.categorias = data
          //console.log(this.categorias)
        }
      })
  }

  eliminar(id: number): void {
    // Muestra el cuadro de diálogo de confirmación
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta catehoria?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Lógica para eliminar el categoria
        this.categoriaService.deleteCategoria(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'categoria eliminada correctamente',
              life: 3000
            });
            this.mostrarCategoria(); // Actualiza la lista de categorias
          },
          err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la categoria',
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
