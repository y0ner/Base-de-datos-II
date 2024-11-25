import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaI } from '../../../models/categoria';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; // Importa MessageModule
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-actualizar-categria',
  standalone: true,
  imports: [InputTextModule, CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule],
  templateUrl: './actualizar-categria.component.html',
  styleUrl: './actualizar-categria.component.css',
  providers: [MessageService]
})

export class ActualizarCategriaComponent implements OnInit{
  public id: number =0;
  //public form: FormGroup;
  formBuilder = inject(FormBuilder);

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  
  categoriaService = inject(CategoriaService);
  messageService = inject(MessageService);

  constructor(
    // private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getCategoria(this.id);

  }

  getCategoria(id: number){
    this.categoriaService.getOneCategoria(id)
    .subscribe({
      next: (data) => {
        this.form.patchValue(data)
        // console.log(data.cliente)
      }
    })
  }


  onSubmit(): void {
    const formValue: CategoriaI = this.form.value;
    const id: number =  this.form.value.id
    this.categoriaService.updateCategoria(id, formValue).subscribe(
      () => {
        // console.log('Se ha creado correctamente');
    //     setTimeout(()=>{                  
    //       this.messageService.add({severity:'success', summary: 'Notificación', detail: 'Cliente Actualizado', life:5000});

    //  }, 0);
        this.router.navigateByUrl('categorias');

      },
      err => {

        console.log(err);
        console.log('No se ha editado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/categorias');
  }

  get name() { return this.form.get('nombre'); }
  get description() { return this.form.get('direccion'); }
}
