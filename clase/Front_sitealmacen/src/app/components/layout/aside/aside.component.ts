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
  items: MenuItem[]=[];


  ngOnInit(): void {
    this.items = [
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        routerLink: '/clientes'
        
      },

      {
        label: 'Productos',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink:'/productos'
      },
      {
        label: 'TipoProducto',
        icon: 'pi pi-fw pi-clipboard',
        routerLink: '/facturas'
      },
      {
        label: 'Consultas Avanzadas',
        icon: 'pi pi-fw pi-clipboard',
        items: [
          {
            label: 'Consulta 1',
            
          }
        ]
      },
  
      

    ];
  }
}
