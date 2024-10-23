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
        label: 'Categorias',
        icon: 'pi pi-fw pi-qrcode',
        routerLink: '/categorias'
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink:   '/productos'
      },
      {
        label: 'Facturas',
        icon: 'pi pi-fw pi-clipboard',
        routerLink: '/facturas'
      },
      {
        label: 'Detalles de Facturas',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/detalles_facturas'
      },
      {
        label: 'Inventarios',
        icon: 'pi pi-fw pi-chart-scatter',
        routerLink: '/inventarios'
      }

    ];
  }
}
