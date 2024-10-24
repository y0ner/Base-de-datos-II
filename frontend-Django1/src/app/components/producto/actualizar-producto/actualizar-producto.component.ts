import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message'; // Importa MessageModule
import { ProductoService } from '../../../services/producto.service';
import { ProductoI } from '../../../models/producto';
import { CategoriaService } from '../../../services/categoria.service';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule, MessageModule, TreeSelectModule ],
  templateUrl: './actualizar-producto.component.html',
  styleUrl: './actualizar-producto.component.css',
  providers: [MessageService]
})

export class ActualizarProductoComponent implements OnInit{
  public id: number =0;
  //public form: FormGroup;
  categories: TreeNode[] = [];
  selectedCategory: TreeNode | undefined;

  productoService = inject(ProductoService);
  formBuilder = inject(FormBuilder); // Usar `inject` para obtener FormBuilder
  messageService = inject(MessageService);
  categoriaService = inject(CategoriaService);

  public form:FormGroup=this.formBuilder.group({
    id: [''],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    stock_actual: ['', [Validators.required]],
    stock_minimo: ['', [Validators.required]],
    categoria: ['', [Validators.required]]
  });
  constructor(
    // private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // let idCliente = this.route.snapshot.paramMap.get("id");
    this.getCliente(this.id);
    this.getCategorias();

  }

  getCategorias() {
    this.categoriaService.getAllCategoria() 
      .subscribe((data: any) => {
        this.categories = data.map((categoria: any) => ({
          label: categoria.nombre, 
          data: categoria.id
        }));
      });
  }

  getCliente(id: number){
    this.productoService.getOneProducto(id)
    .subscribe({
      next: (data) => {
        this.form.patchValue(data)
        
      }
    })
  }

  onSubmit(): void {
    const formValue: ProductoI = this.form.value;
    const id: number =  this.form.value.id
    this.productoService.updateProducto(id, formValue).subscribe(
      () => {
  
        this.router.navigateByUrl('productos');

      },
      err => {

        console.log(err);
        console.log('No se ha creado correctamente');
      }
    );
  }

  cancel() {
    this.router.navigateByUrl('/productos');
  }

  get nombre() { return this.form.get('nombre'); }
  get descripcion() { return this.form.get('descripcion'); }
  get precio() { return this.form.get('precio'); }
  get stock_actual() { return this.form.get('email'); }
  get stock_minimo() { return this.form.get('stock_minimo'); }
  get categoria() { return this.form.get('categoria'); }
}