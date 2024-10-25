import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InventarioService } from '../../../services/inventario.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InventarioI } from '../../../models/inventario';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-inventario',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, InputTextModule, ButtonModule, CardModule, RouterModule, DropdownModule],
  templateUrl: './actualizar-inventario.component.html',
  styleUrls: ['./actualizar-inventario.component.css'],
  providers: [MessageService]
})
export class ActualizarInventarioComponent implements OnInit {
  inventarioForm: FormGroup; // Formulario para actualizar inventario
  private inventarioService = inject(InventarioService); // Inyección de InventarioService
  private messageService = inject(MessageService); // Inyección de MessageService
  private router = inject(Router); // Inyección de Router
  private route = inject(ActivatedRoute); // Inyección de ActivatedRoute
  inventarioId: number | undefined;

  constructor(private fb: FormBuilder) {
    this.inventarioForm = this.fb.group({
      producto: ['', Validators.required],
      tipo_movimiento: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      fecha_movimiento: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.inventarioId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.inventarioId) {
      this.inventarioService.getInventarioById(this.inventarioId).subscribe((data: InventarioI) => {
        this.inventarioForm.patchValue(data);
      });
    }
  }
  
  actualizarInventario(): void {
    if (this.inventarioId !== undefined) {
      console.log(this.inventarioForm.value);
      this.inventarioService.updateInventario(this.inventarioId, this.inventarioForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Inventario actualizado con éxito' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el inventario' });
        }
      });
    }
  }    
}