import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteI } from '../../../models/cliente';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrl: './actualizar-cliente.component.css'
})
export class ActualizarClienteComponent implements OnInit {
  public id: number = 0;
  public form!: FormGroup;  // Usamos '!' para indicar que se inicializa en ngOnInit

  clienteService = inject(ClienteService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.initializeForm();
    this.getCliente(this.id);
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getCliente(id: number): void {
    this.clienteService.getOneCliente(id).subscribe({
      next: (data) => {
        this.form.setValue(data);
      },
      error: (err) => {
        console.error('Error al obtener el cliente:', err);
      },
    });
  }

  onSubmit(): void {
    const formValue: ClienteI = this.form.value;
    const id: number = this.form.value.id;

    this.clienteService.updateCliente(id, formValue).subscribe(
      () => {
        console.log('Cliente actualizado correctamente');
        this.router.navigateByUrl('clientes');
      },
      (err) => {
        console.error('Error al actualizar el cliente:', err);
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/clientes');
  }

  // Getters para los campos del formulario
  get nombre() { return this.form.get('nombre'); }
  get direccion() { return this.form.get('direccion'); }
  get telefono() { return this.form.get('telefono'); }
  get correo() { return this.form.get('correo'); }
  get password() { return this.form.get('password'); }
}
