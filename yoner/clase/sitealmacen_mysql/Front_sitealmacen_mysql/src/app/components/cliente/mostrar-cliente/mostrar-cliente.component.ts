import { Component, OnInit } from '@angular/core';
import { ClienteI } from '../../../models/cliente';
import { Router, ActivatedRoute } from '@angular/router'; // Importamos ActivatedRoute para escuchar los cambios de ruta
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ClienteService } from '../../../services/cliente.service'

@Component({
  selector: 'app-mostrar-cliente',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './mostrar-cliente.component.html',
  styleUrl: './mostrar-cliente.component.css'
})
export class MostrarClienteComponent implements OnInit {
  public clientes: ClienteI[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute // Escuchar cambios de la ruta
  ) { }

  ngOnInit(): void {
    this.mostrarClientes();
    
    // Suscribirse a cambios en la misma ruta
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === "NavigationEnd") {
        // Volver a cargar los clientes cada vez que se complete la navegación
        this.mostrarClientes();
      }
    });
  }

  mostrarClientes() {
    this.clienteService.getAllCliente().subscribe({
      next: (data) => {
        this.clientes = data;
      }
    });
  }

  eliminar(id: number): void {
    this.router.navigateByUrl('/clientes');
    this.clienteService.deleteCliente(id).subscribe(() => {
      this.mostrarClientes();
    });
  }
}
