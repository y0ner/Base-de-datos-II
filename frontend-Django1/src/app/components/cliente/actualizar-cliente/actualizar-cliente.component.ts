import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClienteService } from '../../../services/cliente.service';
import { ClienteI } from '../../../models/cliente';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; // Importa MessageModule

@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrl: './actualizar-cliente.component.css',
  providers: [MessageService]
})

export class ActualizarClienteComponent implements OnInit{
  public id: number =0;
  //public form: FormGroup;
  formBuilder = inject(FormBuilder);

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });
  
  clienteService = inject(ClienteService);
  messageService = inject(MessageService);

  constructor(
    // private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    // Inicializar el formulario en el constructor
    // this.form = this.formBuilder.group({
    //   nombre: ['', [Validators.required]],
    //   direccion: ['', [Validators.required]],
    //   telefono: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    // });
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getCliente(this.id);

  }

  getCliente(id: number){
    this.clienteService.getOneCliente(id)
    .subscribe({
      next: (data) => {
        this.form.patchValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: ClienteI = this.form.value;
    const id: number =  this.form.value.id
    this.clienteService.updateCliente(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('clientes');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
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
