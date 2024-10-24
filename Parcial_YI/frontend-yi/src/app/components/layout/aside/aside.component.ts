import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'] // Corregido a styleUrls
})
export class AsideComponent {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Proyectos',
        icon: 'pi pi-fw pi-briefcase',  // Puedes cambiar el icono si lo deseas
        routerLink: '/proyectos'
      },
      {
        label: 'Patrocinador',
        icon: 'pi pi-fw pi-user',  // Cambia el icono si prefieres otro
        routerLink: '/patrocinadores'
      }
    ];
  }
}
