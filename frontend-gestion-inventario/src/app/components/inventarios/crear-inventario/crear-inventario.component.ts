import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InventarioService } from '../../../services/inventario.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-inventario',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, InputTextModule, ButtonModule, CardModule, RouterModule, DropdownModule],
  templateUrl: './crear-inventario.component.html',
  styleUrls: ['./crear-inventario.component.css'],
  providers: [MessageService]
})
export class CrearInventarioComponent implements OnInit {
  inventarioForm: FormGroup; // Formulario para crear inventario
  private inventarioService = inject(InventarioService); // Inyección de InventarioService
  private messageService = inject(MessageService); // Inyección de MessageService
  private router = inject(Router); // Inyección de Router

  constructor(private fb: FormBuilder) {
    this.inventarioForm = this.fb.group({
      producto: ['', Validators.required],
      tipo_movimiento: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      fecha_movimiento: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {}

  crearInventario(): void {
    if (this.inventarioForm.valid) {
      console.log(this.inventarioForm.value);
      this.inventarioService.createInventario(this.inventarioForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Inventario creado con éxito' });
          this.router.navigate(['/inventarios']);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el inventario' });
        }
      });
    }
  }
}