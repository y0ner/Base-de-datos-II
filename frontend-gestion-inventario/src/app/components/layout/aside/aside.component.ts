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
        label: 'Customers',
        icon: 'pi pi-fw pi-users',
        routerLink: '/clientes'
        
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-qrcode',
        routerLink: '/categorias'
      },
      {
        label: 'Products',
        icon: 'pi pi-fw pi-shopping-bag',
        routerLink:   '/productos'
      },
      {
        label: 'Invoices',
        icon: 'pi pi-fw pi-clipboard',
        routerLink: '/facturas'
      },
      {
        label: 'Invoice Details',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/detalles_facturas'
      },
      {
        label: 'Inventories',
        icon: 'pi pi-fw pi-chart-scatter',
        routerLink: '/inventarios'
      },
      

    ];
  }
}
